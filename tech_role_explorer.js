function searchCSE() {
    // Get the search input value
    var searchInput = document.getElementById('searchInput').value.toLowerCase();

    // List of CSE branches
    var cseBranches = ['computer science', 'software engineering', 'information technology', 'computer engineering'];

    // Filter branches based on the search input
    var filteredBranches = cseBranches.filter(function (branch) {
        return branch.includes(searchInput);
    });

    // Display the results
    displayResults(filteredBranches);
}

function displayResults(branches) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (branches.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
    } else {
        var resultMessage = 'Results: ' + branches.join(', ');
        resultsContainer.innerHTML = resultMessage;
    }
}
