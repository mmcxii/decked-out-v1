const navbarBtnClose = document.querySelector('#navbarBtnClose');
const navbarBtnOpen = document.querySelector('#navbarBtnOpen');
const revealTeamBtn = document.querySelector('#revealTeamBtn');

const closeNavbar = () => {
    document.querySelector('#navbar').classList.add('hidden');
    navbarBtnOpen.classList.remove('hidden');
};

const openNavbar = () => {
    document.querySelector('#navbar').classList.remove('hidden');
    navbarBtnOpen.classList.add('hidden');
};

const revealTeam = () => {
    const teamMembersList = document.querySelector('#teamMembersList');
    const revealTeamBtnIcon = document.querySelector('#revealTeamBtnIcon');

    if (teamMembersList.classList.contains('hidden')) {
        teamMembersList.classList.remove('hidden');

        revealTeamBtnIcon.classList.remove('fa-arrow-alt-down');
        revealTeamBtnIcon.classList.add('fa-arrow-alt-up');
    } else {
        teamMembersList.classList.add('hidden');

        revealTeamBtnIcon.classList.remove('fa-arrow-alt-up');
        revealTeamBtnIcon.classList.add('fa-arrow-alt-down');
    }
};

navbarBtnClose.addEventListener('click', closeNavbar);
navbarBtnOpen.addEventListener('click', openNavbar);
revealTeamBtn.addEventListener('click', revealTeam);
