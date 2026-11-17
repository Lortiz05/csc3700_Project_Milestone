# csc3700_Project_Milestone
## PART 1 INSTRUCTIONS
Our Project: Semester Project -- Aurora CS Course Scheduler

In your terminal make sure to be in the project1 directory also pointing to the src directory before running the first command in terminal 1:

example:

PS C:\Users\(urName)\WebstormProjects\csc3700_Project_Milestone\Project1\src> npm install
Next Command in the same directory location:
PS C:\Users\(urName)\WebstormProjects\csc3700_Project_Milestone\Project1\src> npm run dev

In the second terminal(terminal2):

To start our JSON we will have to be in the Project1 directory location;

Run command:
npx json-server --watch db/db.json --port 3333
___________________________________________________________________________________________
## PART 2 INSTRUCTIONS

In the terminal be sure to have the correct path, Example:

PS C:\Users\(urName)\WebstormProjects\csc3700_Project_Milestone\Project2Node

Next step would be to create and install our node_modules and to be sure our package.json exists.

### Check your current package.jason if it exists:
In your current directory path use Command: dir package.json
It should display the file information IF it exists, otherwise if it does not then there will be an error. 
To resolve this error we can use command: npm init -y
This command is for the default creation of the package.json file. We can confirm it has been created by running our first command earlier.
Check its contents with comand: type package.json


### To install our node_modules file we can run "npm install" in our current directory path so it should look like:

PS C:\Users\(urName)\WebstormProjects\csc3700_Project_Milestone\Project2Node> npm install -y
this command gives us the default packages.
To check if the needed dependencies

### (If node_module specified packages do not exist or are not downloaded yet follow this step below!)
we can then begin to download our needed dependencies if they do not exist or are included in the node_modules file.
commands: npm install cors express mysql2 nodemon dotenv
