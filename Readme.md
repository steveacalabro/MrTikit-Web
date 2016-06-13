#Mr Tikit
This is a public clone of the repository used for MrTikit. Mrtikit is a 2016 Drexel Senior Design Team for the College of Computing and Informatics. 

Parts of this repository have been changed to remove confidential information

##Overview
Mr Tikit is an application designed to provide a ticketing system for Facebook events. The system integrates directly with Facebook to obtain event information, provide status updates, and post to the event page. Once the information is obtained, the system will create an event page synced from the information and provide users the ability to purchase tickets. 

The system will allow for different event ticket types ranging from GA to VIP and will also provide a seat chart designer for events that will need specific seating locations. If the ticket type is not already built into the system, you will be able to provide your own ticket type with a custom rule set.

Users of Mr Tikit will be able to access their tickets from their mobile device. Event staff will then be able to scan the ticket via QR code. Users will also be able to print their tickets at home so to also have a hard copy. Once a user has arrived at an event if they have chosen to do so the system will check in on their Facebook that they have arrived and share it with their friends. Each ticket will link to a specific ticket ID unless the user has requested to generate a new ID if they have lost their ticket. Users will also be able to transfer their tickets to other users. If the event manager has decided to allow refunds or has canceled the event the system will refund the users the full price of the ticket that they have spent.

Staff will be able to scan users tickets either via QR code on a mobile device or by a simple USB scanner attached to a computer running the web application. They will also be able to find users by name if they have lost their tickets as well as manage a guest list of VIP or specific users. While the event is taking place staff will be able to provide periodic updates to the Facebook event page if they wish to. They may also choose to have the system automatically provide updates based off of time, number of users checked in, or many other attributes of the event.

The system is designed to be extremely affordable, simple, and elegant. This means that most of the technology will come from mobile devices and cheap hardware such as barcode scanners. However, the system is also designed to be scaleable so that even 500,000 person events will be able to happen without worry.

Mr Tikit will also provide many event management features such as promotions, email blasts, and sales analytics. The system will also provide an environment to communicate directly with users on the event page through features such as an FAQ and a support ticket system. 

******


####Features List

* Login with Facebook
* List events that a user/page is hosting
* Choose an event to sell tickets to
* Change event details with ticketing link
* Post to event page about tickets
* Ticket types (with built in defaults)
* Discount codes (Based of limited # and time/date)
* Custom event page synced with Facebook event
* Additional FAQ and support page
* PayPal chained payment processes
* Scaled pricing (scaled % of what is paid to Mr Tikit)
* Ticket Scanner (UPC/QR)
* Promotions tracking (for promoters)
* Emailed tickets
* Email blasts
* Refund system
* Support ticket system
* Scheduled event page posting (# tickets left, event starting soon)
* Guest list search
* Custom events(Without Facebook)
* Event notifications


####Milestones

######Focus
1. Complete documentation
2. Build backend REST Api
3. Create a website with only printable tickets and simple barcode scanning
4. Create a mobile app for users as well as a simple QR scanner for admins
5. Create an admin mobile app that allows admins to manage the entire event from their mobile devices

######Dream Goals
1. Create a Mr Tikit event type that allows to create events without Facebook
2. Add a notification system to provide users notifications for upcoming or future events