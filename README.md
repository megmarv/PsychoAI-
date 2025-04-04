
<h1 align="center">
  <br>
  Emotion Detection
  <br>
</h1>

<h4 align="center">Exploring synergies for emotion recognition</h4>

<p align="center">
  •
  <a href="#Custom Convolutional Neural Network">Custom CNN</a> •
  <a href="#VGG-16">VGG-16</a> •
  <a href="#EfficientNet-B7">EfficientNet-B7</a> •
  <a href="#credits">Credits</a> •
</p>

# Custom Convolutional Neural Network

Two datasets were combined in order to enhance the model performance as each of the provided datasets did not display an outstanding performance when considered individually. The datasets used were <a href="https://www.kaggle.com/datasets/msambare/fer2013"> FER-2013 </a> & <a href="https://www.kaggle.com/datasets/dilkushsingh/facial-emotion-dataset"> Facial Emotion Dataset </a>, both publicly available and recognized datasets on <a href="kaggle.com"> Kaggle </a>. Several steps were taken to combine these datasets manually. SHA-256 was used for removing duplicates within the new dataset and all classes for the training directory were balanced using augmentation where necessary.

* SHA-256 process : <a href="https://github.com/megmarv/PsychoAI-/blob/Emotion-Identification3/SHA-256.ipynb">SHA-256.ipynb</a>
* Augmentation : Experimenting with generating the augmented images & adding them to the dataset ( <a href="https://github.com/megmarv/PsychoAI-/blob/Emotion-Identification3/AugmentingDataset.ipynb">AugmentingDataset.ipynb</a> )
* Trained model : <a href="https://github.com/megmarv/PsychoAI-/blob/Emotion-Identification3/Custom_CNN_HybridDataset.ipynb">Custom_CNN_HybridDataset.ipynb</a>

# VGG-16

The same dataset, with a different method of augmentation was used for this model. An attempt was made at training the model, but unsuccessful due to lack of computing requirements. Make sure to have an actively working GPU of at least 8GB and CPU of at least 4.00 HZ before attempting to train this model. The models already existing metrics were considered for the comparison.

* Adding MTCNN Augmentation : <a href="https://github.com/megmarv/PsychoAI-/blob/Emotion-Identification3/Datasetprep_ResNET%2BVGG.ipynb">Datasetprep_ResNET+VGG.ipynb</a>
* Trained model : <a href="https://github.com/megmarv/PsychoAI-/blob/Emotion-Identification3/VGG16.ipynb">VGG16.ipynb</a>
 
# EfficientNet-B7

---




