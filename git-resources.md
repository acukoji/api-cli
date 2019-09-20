# Useful git tutorials and websites

https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud

-this is a link to a git game 

https://www.atlassian.com/git/tutorials/saving-changes/git-commit#targetText=Committed%20snapshots%20can%20be%20thought,be%20stored%20in%20a%20commit.

-This link explains git committ.

The differences between git and SVN commit 

(delta vs snapshot; centralized vs distributed)

Commits are snapshots/milestones within a git project timeline.

each developer’s local repository is a buffer between their contributions and the central repository.

Can time and lump commits; allows developers to decide when to isolate or integrate

# Explanation on StackExchange

https://softwareengineering.stackexchange.com/questions/119782/what-does-stage-mean-in-git#targetText=To%20stage%20a%20file%20is,still%20needs%20some%20work%20done.

-"34

Staging is a step before the commit process in git. That is, a commit in git is performed in two steps: staging and actual commit.

As long as a changeset is in the staging area, git allows you to edit it as you like (replace staged files with other versions of staged files, remove changes from staging, etc.).

Broken metaphor time:

Consider a scenario where you call the movers to get your stuff from your old appartment to your new appartment. Before you do that, you will go through your stuff, decide what you take with you and what you throw away, pack it in bags and leave it in the main hallway. The movers simply come, get the (already packed) bags from the hallway and transport them. In this example, everything until the movers get your stuff, is staging: you decide what goes where, how to pack it and so on (e.g. you may decide that half your stuff will be thrown away before the movers even get there - that's part of staging).

From a technical point of view, staging also supports transactional commits, by splitting all operations into what can fail (staging) and what cannot fail (commit):

The commit in git is implemented transactionally, after the staging is sucessfull. Several steps in the staging can fail (for example, you need to commit, but your HDD is 99.9999% full, and git has no space to perform a commit). This will fail in staging (your repository will not be corrupted by a partial commit) and the staging process doesn't affect your commit history (it doesn't corrupt your repository in case of an error)."

-"With most other version control systems, there’s 2 places to store data: your working copy (the folders/files that you’re currently using) and the datastore (where the version control decides how to pack and store your changes). In Git there’s a third option: the staging area (or index). It’s basically a loading dock where you get to determine what changes get shipped away.

source: http://gitready.com/beginner/2009/01/18/the-staging-area.html"

# Antoher git tutorial
https://githowto.com/create_a_project

# A nice explanation:
https://howtogit.archive.pieterdedecker.be/concepts/types-of-changes.html#targetText=Untracked%20changes%20are%20changes%20to,into%20its%20version%20history%20yet.

# Just staged this file at this point.

# Git game

https://github.com/git-game/git-game

# Why learning git is important for learning coding:

https://www.freecodecamp.org/news/follow-these-simple-rules-and-youll-become-a-git-and-github-master-e1045057468f/