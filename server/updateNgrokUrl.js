const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// 업데이트할 파일들의 경로
const filesToUpdate = [
  path.join(__dirname, '../screens/review/CreatePostScreen.js'),
  path.join(__dirname, '../screens/review/FuneralReviewScreen.js'),
  path.join(__dirname, '../screens/review/PostDetailScreen.js')
];

// 서버 프로세스 ID 저장
let serverProcess;

// 서버 시작 함수
function startServer() {
  return new Promise((resolve, reject) => {
    serverProcess = spawn('npm', ['run', 'server'], { stdio: 'inherit', shell: true });
    serverProcess.on('error', (err) => {
      reject(`Error starting server: ${err.message}`);
    });
    resolve('Server started.');
  });
}

// 서버 종료 함수
function stopServer() {
  return new Promise((resolve, reject) => {
    if (serverProcess) {
      serverProcess.kill('SIGINT');
      resolve('Server stopped.');
    } else {
      resolve('Server not running.');
    }
  });
}

// ngrok 프로세스 확인 함수
function isNgrokRunning() {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    const command = platform === 'win32' ? 'tasklist' : 'pgrep -x ngrok';

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error checking ngrok process: ${error.message}`);
      } else {
        if (platform === 'win32') {
          resolve(stdout.toLowerCase().includes('ngrok.exe'));
        } else {
          resolve(stdout.trim().length > 0);
        }
      }
    });
  });
}

// ngrok 터널 종료 함수
function stopNgrok() {
  return new Promise((resolve, reject) => {
    isNgrokRunning().then((isRunning) => {
      if (!isRunning) {
        resolve('ngrok not running.');
        return;
      }

      const platform = os.platform();
      const killCommand = platform === 'win32' ? 'taskkill /IM ngrok.exe /F' : 'pkill ngrok';

      exec(killCommand, (error, stdout, stderr) => {
        if (error) {
          reject(`Error stopping ngrok: ${error.message}`);
        } else {
          resolve('ngrok stopped.');
        }
      });
    }).catch(reject);
  });
}

// ngrok 터널 시작 및 URL 가져오기 함수
function startNgrok() {
  return new Promise((resolve, reject) => {
    const ngrokProcess = spawn('ngrok', ['http', '3000'], { stdio: 'ignore', detached: true });
    ngrokProcess.unref();

    setTimeout(() => {
      exec('curl http://localhost:4040/api/tunnels', (error, stdout, stderr) => {
        if (error) {
          reject(`Error fetching ngrok tunnels: ${error.message}`);
        } else {
          try {
            const tunnels = JSON.parse(stdout);
            const url = tunnels.tunnels[0].public_url;
            resolve(url);
          } catch (err) {
            reject(`Error parsing ngrok tunnels response: ${err.message}`);
          }
        }
      });
    }, 4000); // 4초 대기 후 ngrok 터널 URL 가져오기
  });
}

// config 파일 업데이트 함수
function updateConfig(url) {
  const configPath = path.join(__dirname, '../server-config.json');
  const config = {
    SERVER_URL: `${url}/posts`,
    UPLOAD_URL: `${url}/upload`
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  console.log(`Updated server-config.json with new ngrok URL: ${url}`);
}

// 메인 실행 함수
async function main() {
  try {
    console.log('Stopping existing ngrok tunnels...');
    await stopNgrok();
    console.log('Existing ngrok tunnels stopped.');
    console.log('Starting server...');
    await startServer();
    console.log('Server started.');
    console.log('Starting new ngrok tunnel...');
    const url = await startNgrok();
    console.log(`ngrok URL: ${url}`);
    updateConfig(url);
  } catch (error) {
    console.error(error);
  }
}

// 종료 시 서버와 ngrok 터널 종료
async function cleanup() {
  console.log('Stopping server and ngrok...');
  await stopServer();
  await stopNgrok();
  console.log('Cleanup completed.');
}

process.on('SIGINT', async () => {
  await cleanup();
  process.exit();
});

process.on('exit', async () => {
  await cleanup();
});

main();
