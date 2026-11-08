// ==UserScript==
// @name         B站搜索页去除小火箭推广视频，播放页点击A键网页全屏，关闭adblock检测警告，禁止直播页面p2p上传；游民星空手机新闻页去广告。
// @namespace    http://tampermonkey.net/
// @version      1.25
// @description  repository: https://github.com/zhulibo/webpage-customize
// @author       zhu
// @match        *.bilibili.com/*
// @match        *://wap.gamersky.com/news/*
// @match        *://outlook.live.com/*
// @icon         https://www.w3.org/2008/site/images/favicon.ico
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==
(function() {
	// node_modules/js-fragment/lib/index.es.js
	/**
	* Load style by code or url
	*
	* @param css - The style code or url.
	*/
	function loadStyle(css) {
		if (css.indexOf("http") === 0) {
			const link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = css;
			document.head.appendChild(link);
		} else {
			const style = document.createElement("style");
			style.appendChild(document.createTextNode(css));
			document.head.appendChild(style);
		}
	}
	/**
	* Throttle a function.
	*
	* @param {Function} fn The function to throttle.
	* @param {number} [delay=200] The number of milliseconds to delay.
	* @param {boolean} [immediate=true] Invoke immediately.
	* @returns {Function} The new throttled function.
	* @returns {Function.cancel} Cancel throttle.
	*/
	function throttle(fn, delay = 200, immediate = true) {
		let lastCallTime = null;
		let addedCallTimeout = null;
		const _throttle = function(...args) {
			const now = Date.now();
			if (immediate) {
				if (!lastCallTime) {
					fn.apply(this, args);
					lastCallTime = now;
				} else if (now - lastCallTime >= delay) {
					fn.apply(this, args);
					lastCallTime = now;
				}
			} else if (!lastCallTime) {
				lastCallTime = now;
				addedCallTimeout = setTimeout(() => {
					fn.apply(this, args);
					lastCallTime = Date.now();
				}, delay);
			} else if (now - lastCallTime >= delay) {
				fn.apply(this, args);
				lastCallTime = now;
				if (addedCallTimeout) clearTimeout(addedCallTimeout);
			}
		};
		_throttle.cancel = () => {
			if (addedCallTimeout) clearTimeout(addedCallTimeout);
			lastCallTime = null;
		};
		return _throttle;
	}
	// src/sites/bilibili.js
	function bilibili_default() {
		function fn1() {
			loadStyle(".adblock-tips{max-height: 0}");
			loadStyle(".container .recommended-swipe{display: none !important;}.container> div{margin-top: 0px !important;}.bili-video-card:has(.ad-feedback-entry){display: none !important;}");
		}
		function fn2() {
			document.addEventListener("keydown", (e) => {
				if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
				if (e.keyCode === 65) document.querySelector(".bpx-player-ctrl-web").click();
			});
		}
		if (location.href.match("://www.bilibili.com/") || location.href.match("://search.bilibili.com/") || location.href.match("://live.bilibili.com/")) {
			document.addEventListener("DOMContentLoaded", function() {
				fn1();
			});
			window.addEventListener("load", function() {
				fn1();
				fn2();
			});
		}
		if (location.href.match("://live.bilibili.com/")) {
			delete window.RTCPeerConnection;
			delete window.mozRTCPeerConnection;
			delete window.webkitRTCPeerConnection;
		}
	}
	// src/sites/gamersky.js
	function gamersky_default() {
		if (location.href.match(/:\/\/wap.gamersky.com\/news\/$/)) document.addEventListener("DOMContentLoaded", function() {
			{
				let items = [".ymw-header2019", "#gsTgWapTop"];
				for (let i = 0; i < items.length; i++) {
					let node = document.querySelectorAll(items[i]);
					if (node && node.length > 0) {
						console.log("已触发 " + items[i]);
						for (let i = 0; i < node.length; i++) node[i].remove();
					}
				}
			}
			{
				let handle = throttle(loadData, 100);
				window.addEventListener("scroll", handle);
				function loadData() {
					let clientHeight = document.documentElement.clientHeight;
					let scrollHeight = document.documentElement.scrollHeight;
					if (document.documentElement.scrollTop + clientHeight >= scrollHeight - 100) {
						let node = document.querySelector(".ymw-more");
						let event = new Event("touchend");
						console.log("已触发 .ymw-more");
						if (node) node.dispatchEvent(event);
					}
				}
			}
		});
		if (location.href.match(/:\/\/wap.gamersky.com\/news\/.+$/)) {
			document.addEventListener("DOMContentLoaded", function() {
				{
					let items = [
						".ymwBootDownload",
						"#gsTgWapTop",
						".gsTgWapConBdshareTopBox",
						".ymw-rel-list",
						".ymw-hot-h5-game",
						"#gsTgWapConBdshareTop"
					];
					for (let i = 0; i < items.length; i++) {
						let node = document.querySelectorAll(items[i]);
						if (node && node.length > 0) {
							console.log("已触发 " + items[i]);
							for (let i = 0; i < node.length; i++) node[i].remove();
						}
					}
				}
				{
					let node = document.querySelector(".ymwContxt");
					if (node) {
						console.log("已触发 .ymwContxt");
						node.style.paddingTop = ".4rem";
					}
				}
				{
					let node = document.querySelector("#gsAreaContextOpen");
					if (node) {
						console.log("已触发 #gsAreaContextOpen");
						node.click();
					}
				}
				{
					const element = document.createElement("div");
					element.className = "ymw-rel-mgame";
					document.body.append(element);
				}
				{
					let node = document.querySelector(".ymw-footer");
					if (node) {
						console.log("已触发 .ymw-footer");
						node.remove();
					}
				}
			});
			window.addEventListener("load", function() {
				{
					let node = document.querySelector("#SOHUCS > a");
					if (node) {
						console.log("已触发 #SOHUCS > a");
						node.remove();
					}
				}
				{
					let node = document.querySelector("#gsTgWapConBdshareTop + div");
					if (node) {
						console.log("已触发 #gsTgWapConBdshareTop + div");
						node.remove();
					}
				}
			});
		}
	}
	// src/sites/outlook.js
	function outlook_default() {
		if (location.href.match("://outlook.live.com/")) document.addEventListener("DOMContentLoaded", function() {
			loadStyle(".QVF0n {display: none!important}");
		});
	}
	// src/main.js
	const href = location.href;
	if (href.match(".bilibili.com/")) bilibili_default();
	if (href.match("://wap.gamersky.com/news/")) gamersky_default();
	if (href.match("://outlook.live.com/")) outlook_default();
})();
