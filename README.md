# Secondary Isolation Calculator

## Motivation

This site was designed to fulfill a need in the laboratory I work in. In the laboratory, we isolate white blood cells from whole blood samples.

By customer request, we may perform a secondary isolation to further isolate a subset of the white blood cells. To do this, we use immunomagnetic separation kits. However, these kits come with a paper manual (folded with space-age origami technique to fit into the tiny kit boxes) and require the operator to manually calculate and record reagent volumes, incubation times, and centrifuge specs required for each step.

_This process is prone to human error due to miscalculation, misunderstanding, and misreading of notes due to handwriting._

**The purpose of this React web app is to provide a user-friendly interface for lab operators to easily select, calculate, and print out the necessary kit parameters for secondary cell isolations.**

## Functionality

**A visitor to the site can:**

- select a species to view its associated positive & negative selection kits
- click any kit's ID number to open up its page on the Miltenyi Biotec site
- choose isolation kits to use, by increasing/decreasing the number of samples to be used with each kit
- view all selected kits in the table, and modify the number of samples per kit, remove a kit, remove a species, or clear the entire table
- fill out sample IDs & cell counts, and have calculations automatically generated
- print out only the essential information from the table

**Visitors can sign in with a password known only to our lab members.**
**A signed-in user can:**

- have access to edit buttons for each kit in species' pages & in the table
- have access to buttons for creating a new kit in the home page & in each species' page
- create, update, or delete a kit, and push the changes to the database

## Stack

This web app was built with MongoDB / Mongoose, Express, React, and Node.js.

## [Deployed on Heroku](https://secondaryisolation.herokuapp.com/)
