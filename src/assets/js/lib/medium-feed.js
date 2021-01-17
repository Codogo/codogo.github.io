import React from "react";
import codogoFetch from "../network/codogo-fetch";

$(function (){
	if ($("section#blog").length > 0) {
		const postLimit = 5;
		const username = "codogo";
		const category = null;

		codogoFetch({
			url: "https://medium.com/feed/" + username,
			fetchParams: {
				method: "GET",
				headers: {
					'Content-Type': 'application/rss+xml'
				},
			},
		})
		.then( (x) => (x.json()) )
		.then(
			(x) => {
				const feed = $( $.parseXML(x.body) )
				.find("item")
				.each(function(i) {
					if( i >= postLimit ) { return false }

					const $this = $(this);
					
					function findDesc(tag) { return ( $(tag).is("h4") || $(tag).is("p") ); }

					function findImg(tag) { return ( tag.src !== undefined || $(tag).find("img").attr("src")); }

					const item = {
						title: $this.find("title").text(),
						link: $this.find("link").text(),
						description: $.parseHTML($this.find("content\\:encoded").html()).find(findDesc).innerHTML.replace(/(<([^>]+)>)/ig,""),
						categories: $this.find("category"),
						content: $this.find("content\\:encoded").text(),
						pubDate: $this.find("pubDate").text(),
						author: $this.find("creator").text(),
						img: (() => {
							x = $.parseHTML($this.find("content\\:encoded").html()).find(findImg);
							return (x.src || $(x).find("img").attr("src"));
						})(),
					}

					if ( !category || item.categories.toArray().reduce( (acc, val) => { return acc || val.textContent === category }, false) ) { 
						$("section#blog .wrapper").append(
							`
							<div class="container">
								<div style="background-image:url('${ item.img }'); background-size: cover;" alt="${ item.title } Post Image">
									<a href="${ item.link }" class="blog-post" target="_blank">
										<div class="darken"></div>

										<div class="text">
											<h1>${ item.title }</h1>
											
											<p>${ item.description }</p>
										</div>
									</a>
								</div>
							</div>
							`
						)
					}
				});
			}
		)
		.then(
			() => {
				$("section#blog .wrapper").append(
					`<div class="container">
						<div>
							<a class="blog-post view-all" href="https://medium.com/${ username }" target="_blank">
								<div class="text">
									<h2>View all posts</h2>

									<p>Read more from Codogo on Medium.</p>
								</div>
							</a>
						</div>
					</div>
					`
				)
			}
		);
	}
});