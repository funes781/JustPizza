import { useRef, useState } from "react";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, message, file });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Plik jest zbyt duży. Maksymalny rozmiar to 5MB.");
      resetFileInput();
      return;
    }
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",
    ];
    
    if (!validTypes.includes(selectedFile.type)) {
      alert("Nieobsługiwany typ pliku. Akceptowane formaty: JPEG, PNG, GIF, MP4.");
      resetFileInput();
      return;
    }

    setFile(selectedFile);
  };

  const resetFileInput = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section id="Contact">
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Wyślij nam feedback
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Twój email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="twój@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Twoja wiadomość
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Twoja wiadomość..."
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Załącz plik (opcjonalnie)
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    id="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-orange-50 file:text-orange-700
                    hover:file:bg-orange-100"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Akceptowane formaty: JPG, PNG, GIF, MP4 (max 5MB)
                </p>
                {file && (
                  <p className="mt-1 text-sm text-gray-600">
                    Wybrany plik: {file.name} (
                    {(file.size / 1024 / 1024).toFixed(2)}MB)
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-md text-white font-medium cursor-pointer bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                Wyślij feedback
              </button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Contact;