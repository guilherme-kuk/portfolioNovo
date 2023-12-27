const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const countCaracter = document.getElementById("countCaracter");
const form = document.getElementById("formContact");
const nameFeedback = document.querySelector(".name-feedback");
const emailFeedback = document.querySelector(".email-feedback");
const messageFeedback = document.querySelector(".message-feedback");
const recaptchaFeedback = document.getElementById("feedbackRecaptcha");
const loading = document.getElementById("loading");

const timeFeedback = 3500;

const maxLength = 200;

form.addEventListener("submit", function (e) {
	e.preventDefault();
	const isValid = validaForm([
		{ input: nameInput, feedback: nameFeedback, validation: validaNome },
		{ input: emailInput, feedback: emailFeedback, validation: validaEmail },
		{
			input: messageInput,
			feedback: messageFeedback,
			validation: validaMessage,
		},
	]);

	const response = grecaptcha.getResponse();
	if (isValid) {
		if (response.length === 0) {
			recaptchaFeedback.classList.remove("d-none");
			loadingBar(timeFeedback);
			setTimeout(function () {
				recaptchaFeedback.classList.add("d-none");
			}, timeFeedback);

			return false;
		}
		this.submit();
		clearForm();
	}
});

function validaForm(validations) {
	let isValid = true;

	validations.forEach((validation) => {
		const { input, feedback, validation: validateFn } = validation;

		if (!validateFn(input.value)) {
			feedback.classList.add("d-block");
			isValid = false;
			return false;
		} else {
			feedback.classList.remove("d-block");
		}
	});

	return isValid;
}

[nameInput, emailInput, messageInput].forEach((input) => {
	input.addEventListener("input", function () {
		this.nextElementSibling.classList.remove("d-block");
	});
});

function validaNome(nome) {
	return nome.trim() !== "";
}

function validaEmail(email) {
	const regex =
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
	return regex.test(email);
}

function validaMessage(message) {
	return message.trim() !== "";
}

messageInput.addEventListener("input", function () {
	messageFeedback.classList.remove("d-block");
	const currentLength = messageInput.value.length;
	countCaracter.innerHTML = `${currentLength} / ${maxLength}`;
});

function clearForm() {
	nameInput.value = "";
	emailInput.value = "";
	messageInput.value = "";
	countCaracter.textContent = "0/200";
}

//Ano atual
const anoAtual = new Date().getFullYear();
document.getElementById("ano-atual").innerHTML = anoAtual;

function loadingBar(duration) {
	loading.classList.remove("d-none");
	loading.classList.add("d-block");

	let startTime = 0;

	function frame(timestamp) {
		if (!startTime) {
			startTime = timestamp;
		}

		const progress = timestamp - startTime;
		const width = (progress / duration) * 100;

		if (width >= 100) {
			loading.classList.remove("d-block");
			loading.classList.add("d-none");
		} else {
			loading.style.width = `${width}%`;
			requestAnimationFrame(frame);
		}
	}
	requestAnimationFrame(frame);
}
