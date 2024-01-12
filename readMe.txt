How to Fix the "src refspec master does not match any" Error

Now you are aware that the master branch does not exist. The solution to this error is to either create a local and remote master branch that you can push the commit to or to push the commit to an existing branch – maybe main.

You can create a remote master branch on a Git managed website (like GitHub) or you can do that directly from your terminal like this:

git checkout -b master 112

# add commit

git push origin master

These commands will create a master branch locally. And by pushing to origin master, the master branch will also be created remotely.

But if you do not want to create a master branch, you can use the existing default branch (which may be main) instead.
Wrapping up

So if you get the Error: src refspec master does not match any error when you try to push to master, the most viable reason is that the master branch does not exist.