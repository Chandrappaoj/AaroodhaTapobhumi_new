const fs = require('fs');
const archiver = require('archiver');

const outputZip = 'DEPLOY_THIS_FIXED_2026.zip';
const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log(`Successfully created ${outputZip} with correct forward-slash paths.`);
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

// append files from DEPLOY_THIS directory, putting its contents at the root of archive
// The 'false' argument ensures we don't include the 'DEPLOY_THIS' folder itself, just its contents.
archive.directory('DEPLOY_THIS/', false);

archive.finalize();
