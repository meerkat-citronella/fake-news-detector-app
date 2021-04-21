import numpy as np
import pandas as pd
import itertools
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

# read the data from news.csv
df = pd.read_csv('./news.csv')

# get the labels
labels = df.label

# split data into train and test sets
x_train, x_test, y_train, y_test = train_test_split(
    df['text'], labels, test_size=0.2, random_state=7)

# Initialize a TfidfVectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)

# Fit and transform train set, transform test set
tfidf_train = tfidf_vectorizer.fit_transform(x_train)
tfidf_test = tfidf_vectorizer.transform(x_test)

# Initialize a classifier -- we are using a Passive Aggressive Classifier
pac = PassiveAggressiveClassifier(max_iter=50, random_state=0)
pac.fit(tfidf_train, y_train)


# CLASSIFY A SINGLE NEWS STORY

def test_story(text_to_test):
    vectorized_text = tfidf_vectorizer.transform([text_to_test])
    test_prediction = pac.predict(vectorized_text)
    return test_prediction[0]
