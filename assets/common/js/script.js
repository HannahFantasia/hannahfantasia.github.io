class ProjectItem {
  constructor(url, imgUrl, imgAlt, imgWidth, imgHeight, title) {
    this.url = url;
    this.imgUrl = imgUrl;
    this.imgAlt = imgAlt;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.title = title;
  }

  render() {
    return `
      <div class="card">
        <a href="${this.url}">
          <img src="${this.imgUrl}" alt="${this.imgAlt}" width="${this.imgWidth}" height="${this.imgHeight}">
        </a>
        <h3><a href="${this.url}">${this.title}</a></h3>
      </div>
    `;
  }
}

// Determine the parent directory (e.g., "events" or "photography")
const pathParts = window.location.pathname.split('/');
const parentDir = pathParts[pathParts.indexOf('projects') + 1];

fetch(`/assets/${parentDir}/projects.json`)
  .then(response => response.json())
  .then(projects => {
    projects.forEach(project => {
      const url = `/pages/projects/${parentDir}/${project}.html`;
      const imgUrl = `/assets/${parentDir}/${project}/media/cover.jpg`;
      const infoUrl = `/assets/${parentDir}/${project}/info.json`;

      fetch(infoUrl)
        .then(response => response.json())
        .then(info => {
          const projectItem = new ProjectItem(
            url,
            imgUrl,
            info.alt,
            400,
            400,
            info.title
          );
          document.getElementById('projects-container').innerHTML += projectItem.render();
        })
        .catch(error => console.error('Error loading project info:', error));
    });
  })
  .catch(error => console.error('Error loading projects list:', error));
  