const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Om/projects/portfolio website/aryan-portfolio';
const files = [
    'package.json',
    'package-lock.json',
    'components/ui/LoadingScreen.tsx',
    'components/ui/AIChat.tsx',
    'components/sections/Testimonials.tsx',
    'components/sections/Terminal.tsx',
    'components/sections/Hero.tsx',
    'components/sections/Contact.tsx',
    'components/sections/About.tsx',
    'components/layout/Navbar.tsx',
    'components/layout/Footer.tsx',
    'app/layout.tsx'
];

files.forEach(f => {
    const p = path.join(dir, f);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');

        // Exact casing
        let newContent = content
            .replace(/Aryan/g, 'Om')
            .replace(/aryan/g, 'om')
            .replace(/ARYAN/g, 'OMPatil') // just OM might look small, let's use OM PATIL or OM depending... wait, "ARYAN" is in LoadingScreen as 'ARYAN PORTFOLIO' and in Hero. Let's make it OM PATIL
            .replace(/om-portfolio/g, 'om-portfolio')
            .replace(/Om's/g, "Om's")
            .replace(/om@email\.com/g, 'aryanpatilofficial77@gmail.com')
            .replace(/linkedin\.com\/in\/om/g, 'linkedin.com/in/om-patil-43712724b')
            .replace(/github\.com\/om/g, 'github.com/ompatil7777')
            .replace(/om\.dev/g, 'ompatil.com');

        // Fix some edge cases from the replacement:
        newContent = newContent.replace(/OMPatil/g, 'OM');

        if (content !== newContent) {
            fs.writeFileSync(p, newContent);
            console.log('Updated ' + f);
        }
    }
});
