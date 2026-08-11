<?php
/**
 * Public Charitre API
 * GET /api/charitre.php - List all published chapters
 * GET /api/charitre.php?chapter_number=X - Get single chapter
 */

require_once 'config.php';

try {
    $pdo = getDBConnection();
    
    if (isset($_GET['chapter_number'])) {
        // Get specific chapter
        $chapter_number = (int)$_GET['chapter_number'];
        
        $stmt = $pdo->prepare("
            SELECT * FROM charitre_chapters 
            WHERE chapter_number = :chapter_number AND is_published = 1 
            LIMIT 1
        ");
        $stmt->execute(['chapter_number' => $chapter_number]);
        $chapter = $stmt->fetch();
        
        if ($chapter) {
            // Find next and prev chapter numbers for navigation
            $navStmt = $pdo->prepare("
                SELECT 
                    (SELECT chapter_number FROM charitre_chapters WHERE chapter_number < :c1 AND is_published = 1 ORDER BY chapter_number DESC LIMIT 1) as prev_chapter,
                    (SELECT chapter_number FROM charitre_chapters WHERE chapter_number > :c2 AND is_published = 1 ORDER BY chapter_number ASC LIMIT 1) as next_chapter
            ");
            $navStmt->execute(['c1' => $chapter_number, 'c2' => $chapter_number]);
            $nav = $navStmt->fetch();
            
            $chapter['prev_chapter'] = $nav['prev_chapter'];
            $chapter['next_chapter'] = $nav['next_chapter'];
            
            sendResponse($chapter);
        } else {
            sendError('Chapter not found', 404);
        }
        
    } else {
        // List all chapters
        // Don't fetch content_kn to save bandwidth on listing
        $stmt = $pdo->query("
            SELECT id, chapter_number, title_kn, subtitle_kn, audio_file, cover_image 
            FROM charitre_chapters 
            WHERE is_published = 1 
            ORDER BY chapter_number ASC
        ");
        
        sendResponse($stmt->fetchAll());
    }
    
} catch(PDOException $e) {
    error_log("Charitre API Error: " . $e->getMessage());
    sendError('Failed to fetch data', 500);
}
?>
