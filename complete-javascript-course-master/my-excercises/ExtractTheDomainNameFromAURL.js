'use strict';

/*
Write a function that when given a URL as a string, 
parses out just the domain name and returns it as a string. 
For example:

* url = "http://github.com/carbonfive/raygun" -> domain name = "github"
* url = "http://www.zombie-bites.com"         -> domain name = "zombie-bites"
* url = "https://www.cnet.com"                -> domain name = "cnet"
*/

const domainName = function(url) {
	const substr = url.substring(url.indexOf("/") + 2);
	if (url.startsWith("http") && !substr.startsWith("www.")) return substr.substring(0, substr.indexOf("."));
	if (!url.startsWith("http") && !url.startsWith("www.")) return url.substring(0, url.indexOf("."));
	return url.split(".")[1];
};

//const domainName = function(url) {
//	return url.split(".");

//};

console.log(domainName("http://github.com/carbonfive/raygun"));
console.log(domainName("http://www.zombie-bites.com"));
console.log(domainName("https://www.cnet.com"));
console.log(domainName("www.xakep.ru"));
console.log(domainName("http://www.8yhy6q4.fr/default.html"));
console.log(domainName("jzoabluo4-nc3ky3xqc9sjmk.jp"));