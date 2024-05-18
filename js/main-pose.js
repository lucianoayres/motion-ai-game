const circleTop = document.querySelector(".circlet-top")
const circleLeft = document.querySelector(".circle-left")
const circleRight = document.querySelector(".circle-right")
const circleBottom = document.querySelector(".circle-bottom")

// Setup animation end listeners for each element once
setupAnimationEndListener(circleTop, "animateInflate")
setupAnimationEndListener(circleBottom, "animateDeflate")
setupAnimationEndListener(circleRight, "animateRollToRight")
setupAnimationEndListener(circleLeft, "animateRollToLeft")

let scoreCount = 0
let scoreDisplay = document.querySelector(".score-digit")

let actionDisplay = document.querySelector(".action")

let actionType = ""

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/fJkvljaju/"
let model, webcam, ctx, labelContainer, maxPredictions

async function init() {
    const modelURL = URL + "model.json"
    const metadataURL = URL + "metadata.json"

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL)
    maxPredictions = model.getTotalClasses()

    // Convenience function to setup a webcam
    const size = 400
    const flip = true // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip) // width, height, flip
    await webcam.setup() // request access to the webcam
    await webcam.play()
    window.requestAnimationFrame(loop)

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas")
    canvas.width = size
    canvas.height = size
    ctx = canvas.getContext("2d")
    labelContainer = document.getElementById("label-container")
    for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        labelContainer.appendChild(document.createElement("div"))
    }
}

async function loop(timestamp) {
    webcam.update() // update the webcam frame
    await predict()
    window.requestAnimationFrame(loop)
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas)
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput)

    for (let i = 0; i < maxPredictions; i++) {
        let className = prediction[i].className
        let shouldAct = prediction[i].probability.toFixed(2) === "1.00" ? true : false
        console.log(className)
        if (shouldAct) {
            actionType = className
        } else {
            actionType = ""
        }

        switch (actionType) {
            case "top":
                triggerAnimation(circleTop, "animateInflate")
                updateScore(10)
                updateAction(actionType)
                break
            case "bottom":
                triggerAnimation(circleBottom, "animateDeflate")
                updateScore(10)
                updateAction(actionType)
                break
            case "right":
                triggerAnimation(circleRight, "animateRollToRight")
                updateScore(10)
                updateAction(actionType)
                break
            case "left":
                triggerAnimation(circleLeft, "animateRollToLeft")
                updateScore(10)
                updateAction(actionType)
                break
            case "neutral":
                updateAction(actionType)
                break
        }
    }

    // finally draw the poses
    drawPose(pose)
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0)
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx)
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx)
        }
    }
}

function reapplyAnimationClass(element, animationClass) {
    element.classList.remove(animationClass)
    // Trigger a reflow, flushing the CSS changes
    void element.offsetWidth
    element.classList.add(animationClass)
}

// Function to reapply the animation class after the animation ends
function setupAnimationEndListener(element, animationClass) {
    element.addEventListener("animationend", function () {
        // Remove the class after the animation ends to reset it
        element.classList.remove(animationClass)

        if (actionType !== "neutral") updateAction("")
    })
}

// Function to trigger the animation
function triggerAnimation(element, animationClass) {
    // If the element does not currently have the animation class, add it
    if (!element.classList.contains(animationClass)) {
        element.classList.add(animationClass)
    }
}

function updateScore(points) {
    scoreCount += points
    scoreDisplay.innerText = scoreCount
}

function updateAction(action) {
    actionDisplay.innerText = action.toUpperCase()
}
