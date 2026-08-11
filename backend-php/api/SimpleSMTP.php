<?php
/**
 * SimpleSMTP Class
 * A lightweight SMTP client for sending emails without Composer/PHPMailer.
 */
class SimpleSMTP {
    private $host;
    private $port;
    private $username;
    private $password;
    private $timeout = 30;
    private $socket;
    private $debug = false;

    public function __construct($host, $port, $username, $password) {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
    }

    public function send($to, $subject, $message, $headers = []) {
        try {
            $this->connect();
            $this->auth();
            
            $this->sendCommand('MAIL FROM: <' . $this->username . '>');
            $this->sendCommand('RCPT TO: <' . $to . '>');
            
            $this->sendCommand('DATA');
            
            $content = "Subject: $subject\r\n";
            $content .= "To: $to\r\n";
            $content .= "From: " . $this->username . "\r\n";
            
            foreach ($headers as $key => $value) {
                $content .= "$key: $value\r\n";
            }
            
            $content .= "\r\n" . $message . "\r\n.";
            
            $this->sendCommand($content);
            $this->sendCommand('QUIT');
            
            fclose($this->socket);
            return true;
        } catch (Exception $e) {
            error_log("SMTP Error: " . $e->getMessage());
            return false;
        }
    }

    private function connect() {
        // Allow self-signed or mismatched certificates (Common on shared hosting)
        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ]);

        $this->socket = stream_socket_client(
            "tcp://{$this->host}:{$this->port}", 
            $errno, 
            $errstr, 
            $this->timeout, 
            STREAM_CLIENT_CONNECT, 
            $context
        );
        
        if (!$this->socket) {
            throw new Exception("Connection failed: $errno - $errstr");
        }
        
        $this->getResponse();
        $this->sendCommand('EHLO ' . gethostname());
        
        // Start TLS if port 587
        if ($this->port == 587) {
            $this->sendCommand('STARTTLS');
            if (!stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new Exception("TLS negotiation failed");
            }
            $this->sendCommand('EHLO ' . gethostname());
        }
    }

    private function auth() {
        $this->sendCommand('AUTH LOGIN');
        $this->sendCommand(base64_encode($this->username));
        $this->sendCommand(base64_encode($this->password));
    }

    private function sendCommand($cmd) {
        if ($this->debug) error_log("SMTP > $cmd");
        fputs($this->socket, $cmd . "\r\n");
        return $this->getResponse();
    }

    private function getResponse() {
        $response = "";
        while ($str = fgets($this->socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ") {
                break;
            }
        }
        if ($this->debug) error_log("SMTP < $response");
        
        // Check for error codes (4xx or 5xx)
        if (substr($response, 0, 1) >= 4) {
            throw new Exception("SMTP Error: $response");
        }
        
        return $response;
    }
}
?>
