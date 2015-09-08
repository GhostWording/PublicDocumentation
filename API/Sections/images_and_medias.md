## How to use APIs for Images

### Presentation of the Images API

Alongside the texts, we also have a collection of categorized images, that are available physicaly through gw-static.azurewebsites.net (but also through an Azure CDN later on).

These resources, mostly images, are available and organized through containers, they are an essential part of our apps in order to illustrate the texts and make the apps more funny.

In order to get a better idea of what images you'll find and the structure of the folders, you can directly navigate html version of the api
throught the browser:

        [http://gw-static.azurewebsites.net/containers](http://gw-static.azurewebsites.net/containers)
    
The containers are a simple way to organize the image by their type. 

In order to get :

* images by intention use /Container/specialoccasions
* images by recipient use /Container/cvd
* images by themes use /Container/themes

For exemple, if you want to show some kittens to send a nice message to your mum:

        GET /container/files/themes/kittens/small

(here you ask for the files for theme kittens in small formal)

You'll get in return a list of relative urls (to http://gw-static.azurewebsites.net) of the images:

        [
            "/themes/kittens/small/196385_329668327144444_1541590776_n.jpg",
            "/themes/kittens/small/307352_10151401995947488_1448832011_n.jpg",
            "/themes/kittens/small/377706_342512579193352_894978699_n.jpg",
            "/themes/kittens/small/shutterstock_70392409.jpg",
            ...
        ]

Then you'll recompose the url in your app to show the images:
        
        http://gw-static.azurewebsites.net/themes/kittens/small/shutterstock_70392409.jpg
        
![kitten and mouse](http://gw-static.azurewebsites.net/themes/kittens/small/shutterstock_70392409.jpg)
        

In the following paragraphs you'll see deeper how navigate through this image api.

In order to access these qualified resources, you should query first the server APIs to get the list of containers and 
then get the list of images in a container.

Note that each container can have it's own definition to qualify it's hierarchy


###List all the children containers available for your app

You should get the array of all containers by calling 

    /container/{appname}:

exemple:

    GET gw-static.azurewebsites.net/container/general

The resulting json is in the same format that for all containers.

But you can also filter by it's properties. 
Let's say that you want to have only the containers that contain small size photos:

    GET  gw-static.azurewebsites.net/container/general?size=small

The properties defined for each container are configured by the admin and may change in time, 
but currently they are defined like that:

- application : the name of the application it targets
- recipient : the recipient target
- theme : what is this about
- size : to get the full size of the images or the thumbnail.

These properties are defined as key/value pairs and look like:

    [
        ...
        {
            "id": "/generic/CloseFriends/good-morning/full",
            "properties": {
                "application": "generic",
                "recipient": "closefriends",
                "intention": "good-morning",
                "size": "full"
            },
            "additionalInfo": "",
            "childrenContainers": null
            },...
    ]

Each of these properties corresponds of a segment of the path in that order

Each segment of the path is also a container and can be called like that.

If there is more subfolders inside to organize even better the files, their names will be stored in extra property field.

the additionalInfo field may content meta information about the container (a textual description of it).

### Get the images of a container

Once you get containers information, you can ask for their contents with the pattern 

    /container/files/{container-id}. Like :

exemple:

    GET gw-static.azurewebsites.net/container/files/generic/CloseFriends/good-morning/full

which returns an array of image paths (relative to the gw-static server):

    [
      "/myapp/goodmorning/sayhello/full/file1-full.jpg",
      "/myapp/goodmorning/sayhello/full/file2-full.jpg"
    ]

You can also ask for the parent container and then you get all the images contained in the children containers:

    GET gw-static.azurewebsites.net/containers/files/myapp/goodmorning/sayhello
    [   ...
        "/generic/CloseFriends/good-morning/full/kitten 2.jpg",
        "/generic/CloseFriends/good-morning/full/kitten 3.jpg",
        "/generic/CloseFriends/good-morning/full/kittenglass1.jpg",
        "/generic/CloseFriends/good-morning/full/kittenglass2.jpg",
        ...
    ]

Or you can also filter the container for specific properties:

    GET gw-static.azurewebsites.net/container/files/myapp/goodmorning?size=small
    [
         "/generic/CloseFriends/good-morning/small/kitten 3.jpg",
        "/generic/CloseFriends/good-morning/small/kittenglass1.jpg",
        "/generic/CloseFriends/good-morning/small/kittenglass2.jpg",
    ]

### Get a random image for a container

It works exactly the same way as for getting all of the images of a container but instead it returns only one image picked randomly:

- if you call a parent container, it will work with all the children images
- you can filter container by properties

The method for this call is:

    GET  gw-static.azurewebsites.net/container/randomfile/{container-name}?{properties}

Then for exemple for a call:

    GET gw-static.azurewebsites.net/container/randomfile/cvd?size=small

You'll get directly a string with a relative path to image:

    /cvd/parent/default/small/shutterstock_70773556.jpg

### Get the images

From here you just have to recompose 

    host+path 

to get access to the images.

Exemple:

    gw-static.azurewebsites.net/myapp/goodmorning/sayhello/full/file2-full.jpg

### List all the containers for all the apps

In case you need to get all the containers available, you should get the array of all containers by calling

  /containers

Like that:
  
  GET gw-static.azurewebsites.net/containers
  
