function buildRepoListHTML (responseJson) {
    let reposListHTML = `<h2>${$('#username').val()}'s repos</h2>
        <ul>`;
    for (i=0; i < responseJson.length; i++) {
        console.log(responseJson[i].name);
        reposListHTML += `<li><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></li>`
    }
    reposListHTML += `</ul>`
    return reposListHTML;
}

function displayRepos(responseJson) {
    let reposListHTML = buildRepoListHTML(responseJson);
    $('#reposList').html(reposListHTML);
    $('#reposList').removeClass('hidden');
}

function displayError(error) {
    $('#error-message').text(`Something went wrong: ${error.message}`);
    $('#error-message').removeClass('hidden');
}

function getRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayRepos(responseJson))
    .catch(error => displayError(error));
}

function resetResults() {
    $('#error-message').addClass('hidden');
    $('#error-message').empty();
    $('#reposList').addClass('hidden');
    $('#reposList').empty();
}

function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        resetResults();
        // console.log($('#username').val());
        getRepos($('#username').val());
    });
}

$(function() {
    // console.log("We're live! Waiting for input.");
    watchForm();
})