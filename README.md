# Fake News Detector App

Client and server for fake news detector app.

To spin up the app locally:

```
cd client
yarn install
yarn start
```

To spin up server, do the following:

Go to the [corpus](https://drive.google.com/file/d/1er9NJTLUA3qnRuyhfzuN0XUsoIC4a-_q/view) and save the csv file to `news.csv` in the `server` directory.

Then:

```
cd server
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python server.py
```

The app uses a Passive Aggressive Classifier, Bag of Words methodology, from this tutorial: [Detecting Fake News with Python and Machine Learning](https://data-flair.training/blogs/advanced-python-project-detecting-fake-news/), using this [corpus](https://drive.google.com/file/d/1er9NJTLUA3qnRuyhfzuN0XUsoIC4a-_q/view)
