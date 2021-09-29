Routes: GET
/ - home page with register or login links

/login - login form

/register - register form

/user - show sobriety clock

/user/inventory - show all resentments

/user/inventory/new - Show new form

/user/inventory/:id - show route to show resentment with this :id

user/inventory/:id/edit - show edit form for resentment with this id

POST
/register - submit registration form

/user/inventory - create new resentment

PUT/PATCH
/user/inventory/:id - update resentment with this :id and redirect

DELETE
/user/inventory/:id - delete resentment with this :id and redirect