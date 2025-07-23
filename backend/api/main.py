from flask import Flask, jsonify, request

# To set a specific port and use a production-grade server like Gunicorn, you can modify your setup. Gunicorn is a WSGI HTTP server for running Python web applications in production. Here's how you can do it:

# 1. Install Gunicorn if you haven't already:
#     ```bash
#     pip install gunicorn
#     ```

# 2. Create a Gunicorn command to run your Flask app. You don't need to modify your `main.py` file for this. Run the following command in your terminal:
#     ```bash
#     gunicorn -w 4 -b 0.0.0.0:8000 main:app
#     ```

#     - `-w 4`: Specifies 4 worker processes.
#     - `-b 0.0.0.0:8000`: Binds the server to all network interfaces on port 8000.
#     - `main:app`: Refers to the `app` object in your `main.py` file.

# Let me know if you need further clarification!

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello, World!"})

@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.get_json()
    return jsonify({"you_sent": data})

if __name__ == '__main__':
    app.run(debug=True)