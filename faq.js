
function createFaqItem(questionText, answerText) {
    
    const faqCondition = document.createElement('div');
    faqCondition.classList.add('condition');

   
    const leftText = document.createElement('p');
    leftText.classList.add('left-text');
    leftText.textContent = 'Program conditions';

  
    const question = document.createElement('p');
    question.classList.add('right-text');
    question.textContent = questionText;

    const faqheader = document.createElement('h1');
    faqheader.classList.add('header-faq-section');
    faqheader.textContent = 'Program conditions';

    const filterDropdown = document.createElement('div');
    filterDropdown.classList.add('filter-dropdown');


    
    const plusMinusBtn = document.createElement('div');
    plusMinusBtn.classList.add('plus-minus-btn');

    const button = document.createElement('button');
    button.classList.add('plus-button');

    const plusIcon = document.createElement('span');
    plusIcon.classList.add('plus-icon');
    plusIcon.textContent = '+';

 
    button.appendChild(plusIcon);
    plusMinusBtn.appendChild(button);

    faqCondition.appendChild(leftText);
    faqCondition.appendChild(question);
    faqCondition.appendChild(plusMinusBtn);


   
    const conditionDetail = document.createElement('div');
    conditionDetail.classList.add('condition-detail');

    const actualDetails = document.createElement('p');
    actualDetails.classList.add('actual-details');
    actualDetails.innerHTML = answerText; 

    
    conditionDetail.appendChild(actualDetails);

   
    conditionDetail.style.maxHeight = '0px';

    plusMinusBtn.addEventListener('click', () => {
        
        const isExpanded = conditionDetail.style.maxHeight !== '0px';
        if (isExpanded) {
            
            conditionDetail.style.maxHeight = '0px'; 
            plusIcon.textContent = '+'; 
            actualDetails.style.opacity=0;
            console.log(actualDetails)
        } else {
            
            conditionDetail.style.maxHeight = `${actualDetails.scrollHeight}px`; 
            actualDetails.style.opacity=100;
            plusIcon.textContent = '−'; 
            console.log(actualDetails)
        }
    });

    
    faqCondition.appendChild(leftText);
    faqCondition.appendChild(question);
    faqCondition.appendChild(plusMinusBtn);

    
    return { faqCondition, conditionDetail };
   
    return { faqCondition, conditionDetail };
}

function fetchFaqData(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const faqContainer = document.getElementById('faq-section');

            data.scholarship.faqs.items.forEach(faq => {
                let answerstring = "";
                faq.answer.forEach(a => {
                    answerstring += a.data + "\n";
                })
                const faqElement = createFaqItem(faq.question, answerstring);
                faqContainer.appendChild(faqElement.faqCondition);
                faqContainer.appendChild(faqElement.conditionDetail);

            });
            data.scholarship.faqs.categories.forEach(c => {
                // create dropdown category
            })
        })
        .catch(error => {
            console.error('Fetching FAQ data failed:', error);
        });
}



const apiUrl = "https://pre-prod.harbour.space/api/v1/scholarship_pages/data-science-apprenticeship-zeptolab";
fetchFaqData(apiUrl);



function createFaqHeader() {
    const headerSection = document.createElement('div');
    headerSection.classList.add('header-faq-section');

    const headerTitle = document.createElement('h1');
    headerTitle.textContent = 'Frequently Asked Questions';
    headerTitle.style.color = '#685DC5';
    headerTitle.style.fontFamily = "'Apercu Pro', sans-serif";
    headerTitle.style.marginLeft = '200px';

    headerSection.appendChild(headerTitle);

    return headerSection;
}

function createFilterDropdown() {
    const filterDropdown = document.createElement('div');
    filterDropdown.classList.add('filter-dropdown');

    const filterText = document.createElement('p');
    filterText.textContent = 'Filter by:';
    filterText.style.color = '#6A6A6A';
    filterText.style.marginRight = '15px';

    const dropdown = document.createElement('div');
    dropdown.classList.add('drop-down');
    dropdown.style.width = '200px';
    dropdown.style.height = '50px';
    dropdown.style.borderRadius = '20px';
    dropdown.style.border = '1px solid #DADADA';
    
    const dropdownText = document.createElement('p');
    dropdownText.textContent = 'Program conditions';
    dropdownText.style.color = '#685DC5';
    dropdownText.style.paddingLeft = '15px';
    dropdownText.style.marginTop = '15px';

    dropdown.appendChild(dropdownText);
    filterDropdown.appendChild(filterText);
    filterDropdown.appendChild(dropdown);

    return filterDropdown;
}

function createFaqLine() {
    const faqLine = document.createElement('div');
    faqLine.style.width = '1260px';
    faqLine.style.height = '1px';
    faqLine.style.borderTop = '1px solid #DADADA';
    faqLine.style.opacity = '1';
    faqLine.style.marginLeft = '180px';

    return faqLine;
}

function fetchFaqData(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const faqContainer = document.getElementById('faq-section');

            
            faqContainer.appendChild(createFaqHeader());
            faqContainer.appendChild(createFilterDropdown());
            faqContainer.appendChild(createFaqLine());

            data.scholarship.faqs.items.forEach(faq => {
                let answerstring = faq.answer.map(a => a.data).join("\n");
                const { faqCondition, conditionDetail } = createFaqItem(faq.question, answerstring);
                faqContainer.appendChild(faqCondition);
                faqContainer.appendChild(conditionDetail);
                faqContainer.appendChild(createFaqLine()); 
            });
        })
        .catch(error => {
            console.error('Fetching FAQ data failed:', error);
        });
}
