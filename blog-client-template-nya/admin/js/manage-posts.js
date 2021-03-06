window.onload = function(){
    fetchAllBlogs();
}

// Fetch request for all blog posts
async function fetchAllBlogs(){
    try{
        let response   = await fetch('http://localhost:3000/posts/')
        let data       = await response.json();
        let manageHTML = '';
        let table      = document.getElementById('tableBody');

        for (let posts of data.reverse()){    
        let postsDate = new Date(posts.date)
        manageHTML +=  
        `<tr>
            <td><p>${posts.title}</p></td>
            <td><p>${posts.author}</p></td>
            <td class="date-info"><p>${postsDate.getFullYear()}-${postsDate.getMonth()}-${postsDate.getDate()}</p></td>
            <td><p>${posts.tags}</p></td>
            <td class="actionTD">
            <br>
            <a href="update-post.html?id=${posts['_id']}" class="update-manage-button">Update</a>
            <br></br>
            <a class="delete-btn" data-id="${posts['_id']}" href=#>Delete</a>
            </td>
        </tr>`
        }
        table.innerHTML = manageHTML;

    }catch(message) {
        throw new Error(message);
    }
    deleteEvent();
}


async function deleteEvent() {
    let deleteBtns = document.getElementsByClassName('delete-btn');

    // Create delete-buttons
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', async function(e) {
            e.preventDefault()

            // the code below deletes the specific post
            let postId = this.dataset.id
            try {
                await fetch('http://localhost:3000/posts/' + postId, {
                    method: 'DELETE',
                });
                console.log()
                this.parentNode.parentNode.remove();
            } catch (message) {
                throw new Error(message);
            }
        })
    }
}