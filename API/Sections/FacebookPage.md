# Facebook page

We have a special page used by apps to share content (a text with an image). This page has all references included in the URL and is 
compatible with Facebook OpenGraph and it also carries [AppLinks](http://applinks.org/documentation/#applinknavigationprotocol) information. 

This is an exemple of this page and how it is build:

[http://www.commentvousdire.com/webapp/fr/area/HumourApp/recipient/LoveInterestF/intention/2E2986/text/DA5F4D?imagePath=/cvd/fbfriend/stockanimals/small/522490_311386318972645_395720258_n.jpg](http://www.commentvousdire.com/webapp/fr/area/HumourApp/recipient/LoveInterestF/intention/2E2986/text/DA5F4D?imagePath=%2Fcvd%2Ffbfriend%2Fstockanimals%2Fsmall%2F522490_311386318972645_395720258_n.jpg)

The pattern and information you provide in the url are the following:

    /webapp/{culture}/area/{area_name}/recipient/{recipient_type}/intention/{intention_id}/text/{text_id}
    
* culture: the language to display the text (fr,en,es)
* area : the name of the area of your app
* recipient : the type of the recipient you target with this text
* intention : the ID of the intention where the text is
* textid : id of the selected text

Additionaly you pass in the query string the path of the image you want to display `imagePath=/path`.

You can also specify within the query string optional arguments used in the header:

* ogtitle: title of the page for open graph
* ogsitename: used if ogtitle is empty and in some places by facebook
* applinkname : name of the app in AppLinks

For exemple, by passing in the query string these values:

      ...text/DA5F4D?applinkname=myapp&ogsitename=mysite&ogtitle=hello&imagePath=%2Fcvd%...
      
The generated page with have in it's metas:

    <meta property="og:title" content="hello" />
    <meta property="og:site_name" content="mysite" />

    <meta property="al:android:app_name" content="myapp" />
    <meta property="al:ios:app_name" content="myapp" />




