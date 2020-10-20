describe("Blog ", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		const user = {
			name: "Niksu Koo",
			username: "niksu",
			password: "salainen",
		};
		cy.request("POST", "http://localhost:3001/api/users/", user);
		cy.visit("http://localhost:3000");
	});
	it("Login from is shown", function () {
		cy.contains("Log in to application");
	});
	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("#username").type("niksu");
			cy.get("#password").type("salainen");
			cy.get("#login-button").click();
			cy.contains("blogs");
		});

		it("fails with wrong credentials", function () {
			cy.get("#username").type("niksu");
			cy.get("#password").type("salan");
			cy.get("#login-button").click();
			cy.contains("Wrong username or password");
		});
		describe.only("When logged in", function () {
			beforeEach(function () {
				cy.contains("login").click();
				cy.get("input:first").type("niksu");
				cy.get("input:last").type("salainen");
				cy.get("#login-button").click();
			});

			it("A blog can be created and liked", function () {
				cy.contains("new blog").click();
				cy.get("#title").type("a Blog created by cypress");
				cy.get("#author").type("Hensku Tee");
				cy.get("#url").type("www.url.fi");

				cy.contains("create new blog").click();
				cy.contains("a Blog created by cypress");

				cy.contains("view").click();
				cy.contains("like").click();
				cy.contains("likes: 1");
			});
		});
		describe.only("When logged in", function () {
			beforeEach(function () {
				cy.contains("login").click();
				cy.get("input:first").type("niksu");
				cy.get("input:last").type("salainen");
				cy.get("#login-button").click();
			});

			it("A blog can be deleted", function () {
				cy.contains("new blog").click();
				cy.get("#title").type("a Blog created by cypress");
				cy.get("#author").type("Hensku Tee");
				cy.get("#url").type("www.url.fi");

				cy.contains("create new blog").click();
				cy.contains("a Blog created by cypress");

				cy.contains("view").click();
				cy.contains("delete").click();
				cy.contains("Deleted a Blog created by cypress");
			});
		});
		describe.only("When logged in", function () {
			beforeEach(function () {
				cy.contains("login").click();
				cy.get("input:first").type("niksu");
				cy.get("input:last").type("salainen");
				cy.get("#login-button").click();
			});

			it("Blogs are sorted by their likes", function () {
				cy.contains("new blog").click();
				cy.get("#title").type("a Blog created by cypress");
				cy.get("#author").type("Hensku Tee");
				cy.get("#url").type("www.url.fi");

				cy.contains("create new blog").click();
				cy.contains("a Blog created by cypress");

				cy.contains("create new blog").click();
				cy.get("#title").type("Toinen blogi");
				cy.get("#author").type("Hensku Tee 2");
				cy.get("#url").type("www.url.fi 2");

				cy.contains("create new blog").click();
				cy.contains("Toinen blogi");

				cy.contains("view").click();
				cy.contains("dislike").click();

				//Toinen blogi nousee nyt ylimmäksi
			});
		});
	});
});
