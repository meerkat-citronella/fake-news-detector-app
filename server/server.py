from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import json
from news_classifier import test_story

hostName = "localhost"
serverPort = 8080


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        # boilerplate GET response
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(
            bytes("<html><head><title>Fake News Classifier</title></head>", "utf-8"))
        self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
        self.wfile.write(bytes("<body>", "utf-8"))
        self.wfile.write(
            bytes("<p>This is an API for classifying news as REAL or FAKE. Send a POST request to this endpoint with a body with the shape of: { \"text\": TEXT_TO_CHECK }.</p>", "utf-8"))
        self.wfile.write(bytes("</body></html>", "utf-8"))

    def do_POST(self):
        # from https://stackoverflow.com/questions/5975952/how-to-extract-http-message-body-in-basehttprequesthandler-do-post
        # get text from req
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        news_text = json.loads(post_body)['text']
        print('text sent from POST request:\n', news_text)

        # get prediction based on text sent
        prediction = test_story(news_text)
        prediction_string = json.dumps({"prediction": prediction})
        print('prediction:', prediction)

        # send response
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(bytes(prediction_string, "utf-8"))


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
