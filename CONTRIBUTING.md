
# Contributing to ffmpeg-handy-presets

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug

- Discussing the current state of the code

- Submitting a fix

- Proposing new features

- Becoming a maintainer

## Creating Preset

**1) create a .js file inside presets folder. Name should be explanatory (camelCase preffered)** 

**2) Require neccessary libraries then export a function with two parameters. (multiple,files) which responsible for processing input and creating output video/image/sound**

 - Multiple argument is boolean and determines if user choose to process
   multiple files. 
 - Files argument holds an array of files. If multiple    is true, you
   should iterate over all files. If not, files[0] will be    our file
   to start process..
 - Our main script will look into presets    folder, create command line
   help and guess nearest preset if user    made typo mistake.

## Example

Below example uses fluent-ffmpeg library and creates thumbnails from video.

```javascript
const  ffmpeg  =  require("fluent-ffmpeg");
const  path  =  require("path");
const  worker  =  async (multiple, files) => {
	if (!multiple) {	
		try {
			let fileinfo = path.parse(files[0]);
			let dir = fileinfo.dir;
			var command =  ffmpeg(files[0])
				.on("filenames", function (filenames) {
					console.log(filenames.join(", ") +  " will be created.");
				})
				.on("end", function () {
					console.log("Done");
				})
				.screenshots({
				count:  2,
				folder: dir,
				});
			command.run();
		} catch (error) {
			//console.log(error);
		}
	}
};
module.exports  = worker;
```

  

## All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase  We actively welcome your pull requests:

  

1. Fork the repo and create your branch from `master`.

2. If you've added code that should be tested, add tests.

3. If you've changed APIs, update the documentation.

4. Ensure the test suite passes.

5. Make sure your code lints.

6. Issue that pull request!


## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

  

## Report bugs using Github's [issues](https://github.com/ahgsql/ffmpeg-handy-presets/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](); it's that easy!



## Use a Consistent Coding Style

I'm again borrowing these from [Facebook's Guidelines](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)

  
* 2 spaces for indentation rather than tabs

* You can try running `npm run lint` for style unification

  

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

  

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)
