"use client";
import { useState } from 'react';

export default function Home() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [isBruteForcing, setIsBruteForcing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [prompt, setPrompt] = useState('$'); // State untuk mengelola prompt

  const wordlist = [
    'password123',
    'iloveyou',
    '12345678',
    'password',
    'admin',
    'qwerty',
    'Mitha',
    'Mitha'// pastikan Mitha berada di akhir agar brute force menunggu sampai menemukan ini
  ];

  const handleCommand = (e) => {
    e.preventDefault();

    if (command === 'ssh imvanz@192.168.62.01') {
      setOutput([...output, `Enter password:`]);
    } else if (command === 'Mitha' && !isBruteForcing) {
      setOutput(prevOutput => [...prevOutput, `Success! Kamu berhasil masuk ke dalam hatinya.`]);
      setIsSuccess(true);
    } else if (command.startsWith('/usr/etc/wordlist/') && !isBruteForcing) {
      setOutput([...output, `Brute-forcing password using wordlist: ${command}...`]);
      simulateBruteForce();
    } else if (command === 'session 1' && isSuccess) {
      setPrompt('$session1>'); // Ubah prompt menjadi $session1>
    } else if (command === 'whoami' && prompt === '$session1>') {
      setOutput(prevOutput => [...prevOutput, 
        `Nama: Mitha`,
        `Lahir: Jogja`,
        `Sekolah: UDINUS`,
        `Ormawa: HMSYSFO`,
        `Selamat, anda berhasil memilikinya.`
      ]);
    } else {
      setOutput(prevOutput => [...prevOutput, `Command not found: ${command}`]);
    }

    setCommand('');
  };

  const simulateBruteForce = () => {
    setIsBruteForcing(true);
    let index = 0;
    const bruteForceInterval = setInterval(() => {
      if (index < wordlist.length) {
        setOutput(prevOutput => [...prevOutput, `Trying password: ${wordlist[index]}`]);
        
        if (wordlist[index] === 'Mitha') {
          setOutput(prevOutput => [...prevOutput, `Password found: ${wordlist[index]}`]);
          clearInterval(bruteForceInterval);
          setIsBruteForcing(false);
          setIsSuccess(true);
        }
        index++;
      } else {
        setOutput(prevOutput => [...prevOutput, `Password not found in wordlist.`]);
        clearInterval(bruteForceInterval);
        setIsBruteForcing(false);
      }
    }, 1000); // setiap 1 detik, coba password berikutnya
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'lime', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <h1>Terminal</h1>
      <div>
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <form onSubmit={handleCommand}>
        <label>
          {prompt} <input 
                type="text" 
                value={command} 
                onChange={(e) => setCommand(e.target.value)} 
                disabled={isBruteForcing}
                style={{ backgroundColor: 'black', color: 'lime', border: 'none', outline: 'none', width: '80%' }} 
            />
        </label>
      </form>
    </div>
  );
}
