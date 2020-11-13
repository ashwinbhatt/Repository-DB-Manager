module.exports = {
    github: {
        TOKEN: 'token 2f2c857415c5394210d819ea4329a605a13be593',
        manager: 'github',
        api_urls: {
            user: 'https://api.github.com/user',
            repository: 'https://api.github.com/user/repos',
            commit: 'https://api.github.com/repos/<?0>/<?1>/commits',
        },
        userStandard: {
            login: 'username', 
            avatar_url: 'avatar_url',
            repos_url: 'repos_api',
            url: 'profile',
            html_url: 'profile_url'
        },
        repoStandard :{
            name: 'name',
            html_url: 'url',
            full_name: 'full_name',
            private: 'private',
            description: 'description',
            fork: 'fork',
            branches_url: 'branches_url',
            commits_url: 'commits_url',
            created_at: 'created_at',
            language: 'language',
            default_branch: 'default_branch'
        }
    }
}