const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                   <img src="${user.avatarUrl}" alt="Foto do perfil do usuario" /> 
                      <div class="data"> 
                          <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                          <p>${user.bio ?? 'Não possui bio cadastrada  😥'}</p>
                           <p>followers ${user.followers ?? 'Não possui   😥'}</p>
                            <p>following ${user.following ?? 'Não possui   😥'}</p>            
                           </div>
                      </div>`

        let repositoriesItems = ''  

        user.repositories.forEach(repo => {
            repositoriesItems += `
            <li>
                <a href="${repo.html_url}" target="_blank"><p>${repo.name}</p> <br> 
                <span>🍴${repo.forks}</span> <span>⭐${repo.stargazers_count}</span> <span>👀${repo.watchers}</span> 
                ${repo.language === null ? '' : `<span class="language">🧑‍💻 ${repo.language}</span>`}</a>
            </li>
            `
        })

        if(repositoriesItems.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItems}</ul>
                                            </div>`
        }

        let eventsItems = ''

        user.events.forEach((event, index) => {
            eventsItems += `<li><p><strong>${event.repo.name}</strong> - ${event.type === 'CreateEvent' ? 'Sem mensagem de commit</p>' : `${event.payload.commits[0].message}</p>`}</li>
           ${user.events.length > index+1 ? '<br><hr><br>' : ''}  `
        })

        if (eventsItems.length > 0){
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItems}</ul>
                                            </div>`
        }
        
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3> Usuário não encontrado 😥</h3>"
    }
}
export { screen }