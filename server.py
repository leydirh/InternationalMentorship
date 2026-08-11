import http.server
import socketserver
import os

PORT = 3000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Redirect /assets/... or /public/assets/... cleanly to project assets directory
        root = os.path.dirname(os.path.abspath(__file__))
        clean_path = path.split('?')[0].split('#')[0]
        
        if clean_path.startswith('/assets/'):
            filename = clean_path.replace('/assets/', '')
            return os.path.join(root, 'assets', filename)
        elif clean_path.startswith('/public/assets/'):
            filename = clean_path.replace('/public/assets/', '')
            return os.path.join(root, 'assets', filename)
            
        return super().translate_path(path)

    def end_headers(self):
        origin = self.headers.get('Origin', '')
        if 'internationalmentorship.net' in origin or 'localhost' in origin:
            self.send_header('Access-Control-Allow-Origin', origin)
        else:
            self.send_header('Access-Control-Allow-Origin', 'https://app.internationalmentorship.net')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    print(f"============================================================")
    print(f" International Mentorship Server Running at http://localhost:{PORT}")
    print(f" Target Deployment: https://app.internationalmentorship.net")
    print(f" Press Ctrl+C in terminal window to STOP the server.")
    print(f"============================================================")
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[Server Stopped]")
