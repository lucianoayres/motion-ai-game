# Motion: An AI-based Pose Detection and Action Recogniton Game

This web game leverages deep learning models for pose estimation and action recognition, delivering real-time feedback based on accurately detected poses.

![Motion Game Screenshot](https://github.com/lucianoayres/motion-ai-game/assets/20209393/ba36a3f9-f8ff-430d-90ee-50b17e32d758)

## Overview

The application integrates the following functionalities:

-   **Pose Estimation:** Utilizes the PoseNet model to estimate human poses in real-time.
-   **Action Recognition:** Employs a pre-trained Teachable Machine classification model to recognize specific actions based on the detected poses.
-   **Interactive Feedback:** Provides interactive feedback by triggering animations and updating scores and actions on the user interface.

## Usage

[Play it online](https://lucianoayres.github.io/motion-ai-game/) or clone the project to run it locally through a live server on a web browser.
Once the application is running, access it through a web browser. The webcam feed will display in real-time, and the application will recognize and respond to different poses and interactions with the 04 colored circles on the screen.

## Technologies Used

-   **HTML, CSS and Javascript**
-   **TensorFlow.js:** Utilized for loading and running the pre-trained machine learning models.
-   **Teachable Machine:** Provides a pre-trained classification model for action recognition.
-   **PoseNet:** Enables real-time human pose estimation from input images or video.

## Contributing

Contributions to the project are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`
3. Make changes and commit them: `git commit -m 'Description of changes'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

This project was developed by [Luciano Ayres](https://www.linkedin.com/in/lucianoayres).

## Acknowledgments

-   Special thanks to the developers of TensorFlow.js, Teachable Machine, and PoseNet for their valuable contributions to the machine learning community.
