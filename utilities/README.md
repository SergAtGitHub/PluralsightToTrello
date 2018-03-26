# Utilities

This section intended to describe utilities which will help you improve your experience in using the source code of the project.

## Bulk Rename Utility

In project we are used to use pipelines, straightly describing the workflow of the program, but to make the workflow process more obvious and understandable we have started using the number before the name of the file, like this:

```
Initialize Popup
|- 1_ReauthOnLoad.ts
|- 2_EnsureTrelloAuthChecker.ts
|- 3_AuthorizationCheck.ts
|- 4_BuildPopupComponent.ts
|- 5_FillInComponents.ts
```

As you can see above, the number before the name of the file, makes it more obvious to understand the order of the flow, but maintaining it, may become hard if you want to add another processor before `ReauthOnLoad` processor.

For this purpose we have created a [Bulk Rename Utility File](https://github.com/SergAtGitHub/PluralsightToTrello/tree/master/utilities/Rename_Processors.bru) which will help you to rename the processors in one click.

_Bulk Rename Utility:_ 
- [website](http://www.bulkrenameutility.co.uk/Main_Intro.php) 
- [chocolatey](https://chocolatey.org/packages/bulkrenameutility)