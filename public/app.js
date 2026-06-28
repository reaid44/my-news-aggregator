async function loadNews() {
  const container = document.getElementById('news-container');
  
  try {
    const response = await fetch('/api/news');
    const newsItems = await response.json();
    
    container.innerHTML = ''; // লোডিং টেক্সট মুছে ফেলা

    if(newsItems.length === 0) {
      container.innerHTML = '<p>কোনো খবর পাওয়া যায়নি।</p>';
      return;
    }

    newsItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'news-card';
      
      card.innerHTML = `
        <span class="source">${item.source}</span>
        <h2>${item.title}</h2>
        <p>${item.summary ? item.summary.substring(0, 150) + '...' : 'কোনো বিবরণ নেই।'}</p>
        <a href="${item.link}" target="_blank">মূল খবরটি পড়ুন</a>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = '<p>খবর লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>';
    console.error(error);
  }
}

loadNews();
