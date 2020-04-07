# Secondary Isolations

## Motivation

This site was designed to fulfill a need in the laboratory I work in. In the laboratory, we isolate white blood cells from whole blood samples.

By customer request, we may perform a secondary isolation to further isolate a subset of the white blood cells. To do this, we use immunomagnetic separation kits. However, these kits come with only a paper manual, and require the operator to manually calculate and record how much reagent is required for each step, as well as other parameters like incubation and centrifuge spin requirements.

_This process is prone to human error due to miscalculation, misunderstanding, and misreading of notes due to handwriting._

**The purpose of this React web app is to provide a user-friendly interface for lab operators to easily select, calculate, and print out the necessary kit parameters for secondary cell isolations.**

## Functionality

**A visitor to the site can:**

- select a species to view its associated positive & negative selection kits
- choose isolation kits to use, by increasing/decreasing the number of samples to be used with each kit
- view all selected kits in the table, with necessary rows for each sample
- modify the number of rows for each kit, remove a kit, remove a species, or clear the table
- fill out sample IDs and cell counts, and have calculations automatically generated
- print out only the essential information on the table page

**Visitors can sign in with a password known only to our lab members.**
**A signed-in user can:**

- see edit buttons for kits on each species' page, and for each kit in the table
- see a button for creating a new kit in each species' page
- create, edit, or delete a kit and push the update to the database

## Stack

This web app was built with MongoDB / Mongoose, Express, React, and Node.js.

## [Deployed on Heroku](https://secondary-isolations.herokuapp.com/)
