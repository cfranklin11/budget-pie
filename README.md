# Budget Pie

**There’s a Slice for Everyone**

## The Team
- Craig Franklin (@cfranklin11)
- Melissa Gattoni (@meligatt)
- Robert Blaszczyk

## Links
- Hosted at [budget-pie.herokuapp.com(http://budgetpie.herokuapp.com/)
- Design mock-ups on [Google Drive] (https://drive.google.com/open?id=0ByMcea6F87IZY1dBRDFFQzNDUjQ)

## Objective

Make the Victorian government’s budget data easier to access and understand, by giving users the information most relevant to them and their issues, and presenting it with graphics to clarify the significance of the numbers.

## Key Users

People most likely to make the effort to look up government budget information: the politically engaged:
- Social activists
- Advocates for causes/groups
- Lobbyists
- Journalists
- Employees of non-profit organisations
- Regular citizens who take a personal interest in good governance.

## How it Works

Users search by government department and/or demographic information that describes themselves, or the groups that they represent.
The app serves them a series of budget cards that display key figures, charts, and headlines about the government programs most relevant to them.
Users can click on these data cards to get more-detailed information about a given program. They can also click through to the full budget data or export data cards as pdfs.
The quality of the results are improved as more users interact with the data cards, indicating which people are most-interested in which programs, increasing the prominence of these items in future queries. 
Through a tracking platform, like Google Analytics, the app will track which demos are most-frequently searched, and which budget items are most popular, in order to inform government officials of citizens’ priorities.

## The Benefits

For people who want information relevant to themselves, or groups that they work with, searching by affected demographic groups is easier than by keyword, especially if the searcher doesn’t know the names of government programs.
Data is presented in a way that is easy to understand, just a few charts, figures, and bullet-points of text. People don’t have to pour over giant tables of financial data to know what the Victorian government is doing for their communities.
Interactivity not only teaches the algorithm, making future results more relevant, but informs government officials of the types of people most engaged in the budget process and which programs garner the most interest.

## How We Use the Data

We took the “Output and Performance Measures” data from each government department to create a list of government programs. Based on the types of people served by these programs, we created personas with specific demographic characteristics (age, work status, family size, etc.), estimating the probability that a given persona would be interested in a given program.

We uploaded this table of personas and budget items to a database. Each time a user searches for programs on Budget Pie, the application fetches budget items from the database and orders them by relevance according to what the user’s search inputs.

As users use Budget Pie and click, or don’t click, on the budget cards, the database is updated with this data in order to inform the ordering of future results.

For now, the initial data is static, downloaded in Excel spreadsheets and uploaded to our databse, but Budget Pie could easily be configured to consume an API to dynamically update its list of government programs and the budget amounts invested in them.
