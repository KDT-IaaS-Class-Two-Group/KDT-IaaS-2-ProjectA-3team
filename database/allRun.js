const { exec } = require('child_process');

// 번들 파일들을 순차적으로 실행
exec('node dist/notice/comment/user/create.bundle.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing file: ${err}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});

exec('node dist/notice/post/user/create.bundle.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing file: ${err}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});

exec('node dist/notice/post/auth/create.bundle.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing file: ${err}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});
