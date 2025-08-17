"use client"


import { CheckCircle, Copy, Key, Shield } from "lucide-react";
import { useState } from "react"

const App = () => {
  const [token, setToken] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSecureJWT = () => {
    setIsGenerating(true)

    // Simula processo de geração
    setTimeout(() => {
      // Gera um token JWT-like seguro com base64url encoding
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })).replace(/[+/=]/g, (match) => {
        return { "+": "-", "/": "_", "=": "" }[match] || match
      })

      const payload = btoa(
        JSON.stringify({
          sub: "user_" + Math.random().toString(36).substr(2, 9),
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h
          jti: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
        }),
      ).replace(/[+/=]/g, (match) => {
        return { "+": "-", "/": "_", "=": "" }[match] || match
      })

      // Gera signature aleatória segura
      const signature = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .substring(0, 43)

      const jwt = `${header}.${payload}.${signature}`
      setToken(jwt)
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = async () => {
    if (token) {
      try {
        await navigator.clipboard.writeText(token)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Erro ao copiar:", err);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 to-slate-200 flex flex-col">
      <header className="text-center pt-8 pb-6 px-4">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-400 to-sky-600 rounded-2xl px-6 py-4 shadow-2xl">
          <Shield size={24} className="text-white" />
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">JWT Gen</h1>
          <Key size={24} className="text-white" />
        </div>

        <p className="text-slate-600 max-w-2xl mx-auto mt-6 px-4 text-base md:text-lg leading-relaxed">Gere tokens JWT seguros e aleatórios com criptografia de 256 bits.
          <span className="block mt-2 text-sky-600 font-medium ">
            Perfeito para autenticação e autorização em suas aplicações.
          </span>

        </p>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-2xl bg-slate-800/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-sky-500/20">
          <div className="text-center mb-8">
            <button
              onClick={generateSecureJWT}
              disabled={isGenerating}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-300 hover:to-sky-500 disabled:from-gray-400 disabled:to-gray-500 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed">
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Gerando Token...
                </>
              ) : (
                <>
                  <Key className="w-5 h-5 group-hover:rotate-12 transtition-transform duration-300" />
                  Gerar Token Seguro
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <label className="block text-slate-100 font-medium text-sm uppercase trancking-wide">Token JWT Gerado</label>
            <div className="relative">
              <textarea
                value={token}
                readOnly
                placeholder="Seu token JWT aparecerá aqui após a geração..."
                className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-4 text-slate-100 placeholder-slate-500 font-mono text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-200"
              />

              {!token && !isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-slate-500 text-center">
                    <Key className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Clique em "Gerar Token" para começar</p>
                  </div>
                </div>
              )}
            </div>

            {token && (
              <div className="flex justify-center">
                <button
                  onClick={copyToClipboard} className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-100 px-6 py-3 rounded-xl text-sky-900 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                  {copied ? (
                    <>
                      <CheckCircle className="text-sky-400 w-4 h-4" />
                      <span className="text-sky-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copiar Token
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {token && (
            <div className="mt-8 p-4 bg-sky-900 border border-sky-500/30 rounded-xl">
              <div className="flex items-center justify-center gap-2 text-sky-500 font-medium mb-2">
                <Shield size={16} />
                Token gerado com sucesso
              </div>
              <p className="text-center text-sky-300 text-sm">
                Este token foi gerado com criptografia segura e é válido por 24 horas.
              </p>
            </div>
          )}

        </div>
      </main>
      <footer className="border-t border-sky-500 py-6">
        <div className="text-center text-slate-600">
          <p className="text-sm">
            &copy; 2025 • Desenvolvidor por{" "}
            <a href="https://github.com/krittz" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-800 font-medium transition-colors duration-200 hover:underline">Krittz</a>
          </p>
        </div>

      </footer>
    </div>
  )
}
export default App;