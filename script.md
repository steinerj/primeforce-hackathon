---


---

<h1 id="angular--nativescript">Angular &amp; NativeScript</h1>
<h2 id="introduction">Introduction</h2>
<p>Are you a developer who always wanted to build an iOS or Android app? Good news! NativeScript is an open-source framework for building native apps with skills you already have – Angular, TypeScript, CSS, and npm. The best part? NativeScript renders truly native UIs – giving your users the best performance and UX their devices can offer. In this workshop you’ll learn how NativeScript works and how to leverage it to build your next mobile app. Then, you’ll dive in and use NativeScript to build an iOS and Android app from scratch. In this workshop you will bring your mobile device and laptop, with the software being discussed installed, and have the unique opportunity to learn hands-on, following along with an instructor step-by-step.</p>
<p>Never used Angular before? No problem, during this workshop your instructor will teach you both Angular and NativeScript side by side.</p>
<p>You will go through a set of exercises that will teach you how:</p>
<ul>
<li><em>Define UI to render on both iOS and Android</em></li>
<li><em>Configure page navigation – including the use of native page navigation animations</em></li>
<li><em>Connect to a real back-end – prepared by the Spring team</em></li>
<li><em>And more</em></li>
</ul>
<h3 id="preparation">Preparation:</h3>
<p>For this workshop, you should bring your laptop with: the <strong>NativeScript CLI</strong>  installed, just run:</p>
<p><em>npm i -g nativescript</em></p>
<p>You should also install the <strong>Angular CLI</strong></p>
<p><em>npm i -g @angular/cli<br>
npm i -g @nativescript/schematics</em></p>
<p><em>You should also bring an Android or iOS device with <strong>NativeScript Playground</strong>  and <strong>NativeScript Preview</strong>  apps installed.</em></p>
<p><em>To test the setup try the following steps:</em></p>
<ol>
<li><em>Create a new project:</em></li>
</ol>
<p><em>tns create test --ng</em></p>
<ol start="2">
<li><em>Go inside the project and run a preview command</em></li>
</ol>
<p><em>cd test</em></p>
<p><em>tns preview</em></p>
<ol start="3">
<li><em>Open the <strong>NativeScript Playground</strong>  app on your phone and <strong>scan the QR code</strong></em></li>
</ol>
<h3 id="backend">Backend</h3>
<p>java -jar sth-backend-0.0.1-SNAPSHOT.jar</p>
<p>It will run on localhost:8080 and there you can find the list of API endpoints. There’s one additional endpoint http:localhost:8080/login that is not on the list.</p>
<p>You can use <a href="https://ngrok.com/">https://ngrok.com/</a> to tunnel to your locally running server. You can use this command to run <code>ngrok</code> for port 8080.</p>
<pre class=" language-bash"><code class="prism  language-bash">./ngrok http 8080
</code></pre>
<p>NB: The backend requires Java 12</p>
<h2 id="angular-for-web">Angular for Web</h2>
<p>Please follow Sebastian’s excellent instructions</p>
<h2 id="nativescript--angular">NativeScript &amp; Angular</h2>
<h3 id="creating-the-app">1. Creating the app</h3>
<p>Create an Angular based NativeScript app using the Angular CLI:<br>
<em><strong>ng new -c=@nativescript/schematics my-mobile-app</strong></em></p>
<p>For details see: <a href="https://docs.nativescript.org/angular/tooling/angular-cli">https://docs.nativescript.org/angular/tooling/angular-cli</a></p>
<p>Add your platform of choice using the NativeScript CLI, e.g.:<br>
<em><strong>tns platform add android</strong></em></p>
<p>You can test your app, by running:<br>
<em><strong>tns preview</strong></em></p>
<h3 id="building-a-login-screen">2. Building a Login Screen</h3>
<h4 id="the-login-component">The Login Component</h4>
<p>In order to secure the app, we will need a login screen asking for username and password.<br>
The backend you worked on has a /login endpoint against which we will authenticate. A sample user/pw from the mock data is:<br>
<em>rhenkmann0 / pass</em></p>
<p>We start by creating an Angular component using the CLI in the root of the app we created before:<br>
<em><strong>ng g c login</strong></em></p>
<p>Then add a route for the newly created login component in <em><strong>app.routing.module.ts</strong></em> and have the root-route redirect there.</p>
<p>Open the component’s template - <em><strong>login.component.html</strong></em> and add a Layout Container, such as a StackLayout, two TextFields for username and password, and a Button for actually logging in.</p>
<pre><code>&lt;StackLayout class="page"&gt;
    &lt;StackLayout class="form"&gt;
            &lt;TextField class="input" hint="Username"&gt;&lt;/TextField&gt;
            &lt;TextField class="input" hint="Password"&gt;&lt;/TextField&gt;
            &lt;Button text="Log in" (tap)="login()" class="btn btn-primary"&gt;&lt;/Button&gt;
    &lt;/StackLayout&gt;
&lt;/StackLayout&gt;
</code></pre>
<p>For now, you can add some behaviour to the button by creating an event handler stub in <em><strong>login.component.ts</strong></em></p>
<pre><code>login(){
    alert('yay!');
  }
</code></pre>
<p>Test your newly created Login screen by running<br>
<em><strong>tns preview</strong></em></p>
<p>Exciting! Now let’s add some real behaviour.</p>
<h4 id="the-backend-service">The Backend Service</h4>
<p>Before we create the service please uncomment the NativeScript specific HTTP and Forms module in <em><strong>app.module.ts</strong></em>. Make sure to add them to the ngModule imports as well.</p>
<p>Now create the service using the Angular CLI:</p>
<p><em><strong>ng g s shared/backend --skipTests=true</strong></em></p>
<p>Add the following imports (we’ll need them later):</p>
<pre><code>import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
</code></pre>
<p>And let’s put a small User class in the same file:</p>
<pre><code>export class User {
  username: string;
  password: string;
}  
</code></pre>
<p>Let’s also inject the HttpClient and make it a member variable via the Constructor.<br>
We’ll also add the relevant backend URIs - Make sure to use YOUR backend URI:</p>
<pre><code>private baseUrl = 'https://YOURTOKEN.ngrok.io';
private loginUri = `${this.baseUrl}/login`;
</code></pre>
<p>And then create a login method, which takes a User object as it’s parameter and returns an Observable.</p>
<pre><code>login(user: User): Observable&lt;any&gt; {
    const body = new HttpParams();
    body.append('username', user.username);
    body.append('password', user.password);

    return this.http.post(this.loginUri, body);
  }
</code></pre>
<h4 id="wiring-it-up">Wiring it up</h4>
<p>Edit <em><strong>login.component.ts</strong></em> to make use of the new Backendservice and also inject the router in that process. Instantiate a new User as well.</p>
<pre><code>user:  User;
constructor(private  backendService:BackendService, private  router:Router) {
  this.user = new User();
}
</code></pre>
<p>We can now extend our login() method stub by a real call to the backend via our new service:</p>
<pre><code>login(){
 this.backendService.login(this.user).subscribe(
  data =&gt; {
	this.router.navigate(["/home"]);
  },
  error =&gt; alert('Something went wrong '+ JSON.stringify(error))
 );
}
</code></pre>
<p>And lastly, we need to wire up our TextField inputs to actually fill the User object, by two-binding it:</p>
<pre><code>[(ngModel)]="user.username"
[(ngModel)]="user.password"
</code></pre>
<p>Test it! Job done - we have successfully guarded our highly critical home component by an authentication screen.</p>
<p>If you got lost anywhere on the way, you can clone this app, which should have you all set:<br>
<a href="https://github.com/steinerj/primeforce-hackathon/tree/master/simpleapp-login">https://github.com/steinerj/primeforce-hackathon/tree/master/simpleapp-login</a></p>
<h3 id="list-of-service-providers">3. List of Service Providers</h3>
<p>Let’s extend our allmighty BackendService to also retrieve a list of service providers from the backend.<br>
Provide a URL to the correct endpoint and add a method for retrieving the list</p>
<pre><code>private serviceProvidersUri = `${this.baseUrl}/serviceProviders`;

public getServiceProviders(): Observable&lt;ServiceProvider[]&gt; {
 return this.http.get&lt;any&gt;(this.serviceProvidersUri)
  .pipe(
     map(res =&gt; res._embedded.serviceProviders)
  );
}
</code></pre>
<p>As your IDE should point out, it expects a known Type for a ServiceProvider. So let’s create that, too:</p>
<pre><code>export interface ServiceProvider {
  name: string;
  description: string;
  website: string;
  industry: string;
  country: string
  city: string;
  logo: string;
}
</code></pre>
<p>Let’s create a component to use that endpoint and display service providers in a List<br>
<em><strong>ng g c service-provider-list</strong></em></p>
<p>Make sure to add a route to that component!</p>
<p>Now add a ListView to the newly created component’s markup.</p>
<blockquote>
<p>NB: The ListView (and all scrollable components) either need a fixed<br>
height or a fixed layout container to work correctly on all platforms.</p>
</blockquote>
<pre><code>&lt;ListView [items]="serviceProviders | async" (itemTap)="onItemTap($event)" class="list-group"&gt;
    &lt;ng-template let-serviceProvider="item" let-i="index" let-odd="odd" let-even="even"&gt;
        &lt;StackLayout orientation="vertical" class="list-group-item"&gt;
            &lt;Label class="title" [text]="serviceProvider.name"&gt;&lt;/Label&gt;
        &lt;/StackLayout&gt;
    &lt;/ng-template&gt;
&lt;/ListView&gt;
</code></pre>
<p>Learn more here: <a href="https://docs.nativescript.org/angular/ui/ng-ui-widgets/listview#listview">https://docs.nativescript.org/angular/ui/ng-ui-widgets/listview#listview</a></p>
<p>In our <em><strong>service-provider-list.component.ts</strong></em> we should inject the list and load an Array of service providers on component initilisation:</p>
<pre><code>constructor(private backendService:BackendService) { }

serviceProviders: Observable&lt;ServiceProvider[]&gt;;

ngOnInit() {
	this.serviceProviders = this.backendService.getServiceProviders();
}
</code></pre>
<p>The “async” pipe in the ListView enables the ListView component to directly handle the Observable returned from the service. We therefore don’t need to subscribe to it like in the Login-Component.</p>
<p>Now we can actually add some on tap behaviour as well:</p>
<pre><code>onItemTap(e){
  const tappedItem = e.view.bindingContext;
  alert(JSON.stringify(tappedItem));
}
</code></pre>
<p>Now we should modify our Login Component to route to the list instead of the home view.</p>
<p>Excellent. All set - you should see a list of service providers after logging in.<br>
If you got lost or something broke, you can clone this repo:<br>
<a href="https://github.com/steinerj/primeforce-hackathon/tree/master/simpleapp-list">https://github.com/steinerj/primeforce-hackathon/tree/master/simpleapp-list</a></p>
<h3 id="making-it-prettier">4. Making it prettier!</h3>
<p>Now that we have all basic functionality, we should add some bits &amp; bobs and style things up a bit.<br>
Add some extra information to the service providers list by modifying its template, e.g. to include country and industry information:</p>
<pre><code> &lt;ng-template let-serviceProvider="item" let-i="index" let-odd="odd" let-even="even"&gt;
        &lt;StackLayout orientation="vertical" class="list-group-item"&gt;
            &lt;Label class="h2" [text]="serviceProvider.name"&gt;&lt;/Label&gt;
            &lt;StackLayout orientation="horizontal"&gt;
                &lt;Label class="h5" [text]="serviceProvider.country"&gt;&lt;/Label&gt;
                &lt;Label class="h5" text=" - "&gt;&lt;/Label&gt;
                &lt;Label class="h5" [text]="serviceProvider.industry"&gt;&lt;/Label&gt;
            &lt;/StackLayout&gt; 
        &lt;/StackLayout&gt;
 &lt;/ng-template&gt;
</code></pre>
<p>We should also add logo to the login page. Create an images folder next to your components and add the Primeforce logo: <a href="https://github.com/steinerj/primeforce-hackathon/tree/master/resources">https://github.com/steinerj/primeforce-hackathon/tree/master/resources</a><br>
We can also mark our Password field as such by adding the “secure” property. And we could use a cool FlexBoxLayout as our base layout, so that:</p>
<pre><code>&lt;FlexBoxLayout class="page"&gt;
    &lt;StackLayout class="form"&gt;
            &lt;Image class="logo" src="~/images/primeforce-logo.png"&gt;&lt;/Image&gt;
            &lt;TextField class="input" hint="Username" [(ngModel)]="user.username"&gt;&lt;/TextField&gt;
            &lt;TextField class="input" secure="true" hint="Password" [(ngModel)]="user.password"&gt;&lt;/TextField&gt;
            &lt;Button text="Log in" (tap)="login()" class="btn btn-primary"&gt;&lt;/Button&gt;
    &lt;/StackLayout&gt;
&lt;/FlexBoxLayout&gt;
</code></pre>
<p>This view will not work correctly yet, as some of these elements need styling such as height information as such, so we add some classes to <em><strong>login.component.css</strong></em></p>
<pre><code>.page {
    align-items: center;
}
.form {
  margin-left: 10;
  margin-right: 10;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 25;
  height: 200;
}

.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 20;
  placeholder-color: #A8A8A8;
}

.btn-primary {
  height: 50;
  margin: 20 5 5 5;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}
</code></pre>
<p>Much better, we’re full-stack-developers after all :D<br>
As per usual, find the full app here:<br>
<a href="https://github.com/steinerj/primeforce-hackathon/tree/master/simpleapp-styled">https://github.com/steinerj/primeforce-hackathon/tree/master/simpleapp-styled</a></p>
<h3 id="scope-creep----more-features">5. SCOPE CREEP  - More features!</h3>
<ul>
<li>
<p>You can checkout this example - which adds a TabView, makes the list searchable, includes a chatbot etc:<br>
<a href="https://play.nativescript.org/?template=play-ng&amp;id=54hxCv&amp;v=11">https://play.nativescript.org/?template=play-ng&amp;id=54hxCv&amp;v=11</a></p>
</li>
<li>
<p>You could add a user landing page</p>
</li>
<li>
<p>You could add a star rating for each service provider, e.g. after tapping on Service Provider. Have a look at this plugin: <a href="https://market.nativescript.org/plugins/nativescript-rating-dialog">https://market.nativescript.org/plugins/nativescript-rating-dialog</a><br>
To add it you can run: <em><strong>tns plugin add nativescript-rating-dialog</strong></em><br>
Please note that this won’t work with tns preview, as tns preview only works with a preselection of plugins which doesn’t include the ratings plugin.</p>
</li>
</ul>

