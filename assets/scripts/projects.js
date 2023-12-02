const project = {
	//Projeto 1
	number: "01",
	title: "Jailson Santos Advocacia",
	description: "Site onepage para escritório de advocacia",
	previewLink: "https://jailsonsantosadvocacia.com.br",
	previewText: "View",
	imageSrc: "project_1.webp",
};

function createProject(project) {
	const projectContainer = document.getElementById("projects-container");

	const projectDiv = document.createElement("div");
	projectDiv.className = "col-12 project py-4";

	projectDiv.innerHTML = `
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-lg-1 number-project my-1">
                <h3>${project.number}</h3>
            </div>
            <div class="col-lg-4 title-project my-1">
                <h3>${project.title}</h3>
            </div>
            <div class="col-lg-5 description-project my-2">
                <p>${project.description}</p>
            </div>
            <div class="col-lg-2 preview-project d-flex justify-content-center mt-3">
                <a href="${project.previewLink}" target="_blank" 
                class="bg-preview-project btn d-flex align-items-center justify-content-center flex-column" 
                data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip-project" 
                    data-bs-html="true" data-bs-title="Clique para acessar <span><i class='fas fa-hand-pointer'></i></span>">
                    <i class="fa-solid fa-eye"></i>${project.previewText}
                </a>
            </div>
            <img src="/assets/img/${project.imageSrc}" class="img-project" alt="" />
        </div>
    `;

	projectContainer.appendChild(projectDiv);
}

createProject(project);
