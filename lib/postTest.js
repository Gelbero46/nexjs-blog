import { remark } from 'remark';
import html from 'remark-html';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '../posts');

export async function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData =  fileNames.map( async (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

     
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

           // Use Remark to convert markdown into HTML string
          
        const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
        const contentHtml = processedContent.toString();
 
        
        console.log( 'markdown *******', contentHtml);

        console.log("id", id)
        console.log("matter Data*******",matterResult)
        // Combine the data with the id
        return {
        id,
        ...matterResult.data,
        };
    });

    // Sort posts by date
    console.log('allPostsData', allPostsData);
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
        return 1;
        } else {
        return -1;
        }
    } )
}

console.log("getSortedPostsData", getSortedPostsData());

// const items = [
//     { name: "Edward", value: 21 },
//     { name: "Sharpe", value: 37 },
//     { name: "And", value: 45 },
//     { name: "The", value: -12 },
//     { name: "Magnetic", value: 13 },
//     { name: "Zeros", value: 37 },
//   ];
  
//   // sort by value
//   items.sort((a, b) => a.value - b.value);
  
//   // sort by name
//   items.sort((a, b) => {
//     const nameA = a.name.toUpperCase(); // ignore upper and lowercase
//     const nameB = b.name.toUpperCase(); // ignore upper and lowercase
//     console.log(nameA, nameB)
//     if (nameA < nameB) {
//         console.log('lesser')
//       return -1;
//     }
//     if (nameA > nameB) {
//         console.log('greater')
//       return 1;
//     }
  
//     // names must be equal
//     return 0;
//   });

//   console.log(items)


    // "type": "module",