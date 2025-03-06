
<h1 align="center">
  <br>
  Custom Convolutional Neural Network
  <br>
</h1>

<h4 align="center">An advanced convolutional neural network made from scratch</h4>

<p align="center">
  <a href="#Dataset Preparation">Dataset Preparation</a> •
  <a href="#how-to-use">Model Architecture</a> •
  <a href="#download">Classification Report</a> •
  <a href="#credits">Credits</a> •
</p>

# Dataset Preparation

Two datasets were combined in order to enhance the model performance as each of the provided datasets did not display an outstanding performance when considered individually. The datasets used were <a href="https://www.kaggle.com/datasets/msambare/fer2013"> FER-2013 </a> & <a href="https://www.kaggle.com/datasets/dilkushsingh/facial-emotion-dataset"> Facial Emotion Dataset </a>, both publicly available and recognized datasets on <a href="kaggle.com"> Kaggle </a>. Several steps were taken to combine these datasets manually.

## FER-2013
* Contains a total of 35900 images
* All images are grayscale in 48 * 48 pixels format
* Contains a test directory and train directory with 7 classes each
* Highly imbalanced classes
  * Angry_test    : 958
  * Happy_test    : 1774
  * Disgust_test  : 111
  * Fear_test     : 1024
  * Neutral_test  : 1233
  * Sad_test      : 1247
  * Surprise_test : 831
  * Angry_train : 3995
  * Happy_train : 7215
  * Disgust_train : 436
  * Fear_train : 4097
  * Neutral_train : 4965
  * Sad_train : 4830
  * Surprise_train : 3171

## Facial Emotion Dataset 
* Contains a total of 36800 images
* All images are grayscale in 48 * 48 pixels format
* Contains a test directory and train directory with 7 classes each
* Somewhat Imbalanced classes
  * Angry_test : 971
  * Disgust_test : 567
  * Fear_test : 911
  * Happy_test : 1599
  * Neutral_test : 1259
  * Sad_test : 1240
  * Surprise_test : 793
  * Angry_train : 3880
  * Disgust_train : 2324
  * Fear_train : 3654
  * Happy_train : 6395
  * Neutral_train : 5036
  * Sad_train : 4959
  * Surprise_train : 3169
 


---




