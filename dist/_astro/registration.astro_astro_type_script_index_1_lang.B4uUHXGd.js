const o=[{id:"1",title:"Kenyan Streetwear Trends: Beyond the Aesthetic",slug:"kenyan-streetwear-trends",excerpt:"From oversized silhouettes to tribal print fusions, see how Nairobi's youth are redefining modern identity through bold style choices.",content:"Full content here...",category:"streetwear",bannerImage:"https://lh3.googleusercontent.com/aida-public/AB6AXuDoYBiRzrotXyoGqnzmkWO5mJSkvsVeV1wbmZk79_x8gLvxKyUjxG0BZYbsTcJUCP-sVPhklqmr309M0e6ZxzGeS5n52mS8yHAKzos1SkYfRww5aMCkw9COILddSNT4vkQBpFahkjKj5kuhjeq5m3i0euUL5ydL9fD15k6Alf9zTn4eToJ2xAjJIEOpdtVGT47HzKj1l1jhZ0Y1jaXmVHLU5zXKuC2hvnkYvqDOQynmkvGveD69G0N-dWQzL53Am4h5w3L2Eb9HMc8",author:"Wanjiku Kamau",date:"2023-10-12",readTime:"5 min read"},{id:"2",title:"How to Spot Vintage Gems in Gikomba",slug:"vintage-gems-gikomba",excerpt:"The ultimate guide to navigating East Africa's largest open-air market for high-end labels and unique 90s finds.",content:"Full content here...",category:"vintage",bannerImage:"https://lh3.googleusercontent.com/aida-public/AB6AXuDuFfF6kCtk0imm5wS2u1kkKrw7okew5LyYZQMIL3netV50EKxsdcTIbZDy3VTq_9EHW8z0nGqhmtXVSbUnaDuQZ913afYbbKlPiRx6XYKOTgiCfwGBy-ZDZuNj-uKrtSnvzB3VzmpgtRPii89n4hsJPlYPkxjkUNLPMTM_4wa7rvfwFMPul5dEdsTSeeOHWscOIlu2AtG70lKHXyoT6CoZlODevQrpG23G81fZc5UGiRvnekIJBe-53hLe1bXSUH2BfxyYtcR8uuw",author:"James Otieno",date:"2023-10-10",readTime:"7 min read"},{id:"3",title:"Sustainable Fashion in Nairobi",slug:"sustainable-fashion-nairobi",excerpt:"Meet the local designers transforming recycled materials into runway-ready couture, leading the slow fashion movement.",content:"Full content here...",category:"sustainable",bannerImage:"https://lh3.googleusercontent.com/aida-public/AB6AXuDkk77Cd7sm6GaxfJBrehekp7H7wQFIRMfGgtt9lAu2Le4TYBOBDEdGK29jXEgw4zDgL0xC83FjoomwuYiwlhxFmm5TzSmKdNM9zpjYZMfWGXwNzBujHP-Sey2X7RTmEkGTeLq8BUiXgxxUsheBU-9rv9QMBsRkPHLO6v3X4tHReoaoDvVoT1YSDhuJnDXwL-GQvo3Cwj7oGSwfRdV40RKa_ov2YeSyVLnnnzJgKXCXYyRNnxslrCS9e3wSZCpiBuiSncnT-gVsMuo",author:"Njeri Mwangi",date:"2023-10-08",readTime:"6 min read"},{id:"4",title:"The Modern Maasai: Reimagined Patterns",slug:"modern-maasai-patterns",excerpt:"How traditional shuka patterns are finding their way into high-fashion menswear and luxury accessories.",content:"Full content here...",category:"local-labels",bannerImage:"https://lh3.googleusercontent.com/aida-public/AB6AXuD-Yxup1LA46Tbqgcxq4luOkaSjTtvgNRN9-Qzqf-NZ4x8JNBPt-IQc7xj5XyjpguBzkiAAV0Qawlv4BniC6LAPfjqwUqLs5J2_2VW6vY0MCz_iuEJALfe-jGSnJqSjyYjEHIRMaY8vA8UXele0jBI9Tl8Swp4a5I-FtEt5iuB6TU9D5HHOGCaAeEPf2WFyOcsHha4s1IZYr0BIgGWJ-RnlbEj6CUCrYMeDyyvSa1krnQFIO2aAAVzpbhZzcK1n0U_yonSdyabZ1-o",author:"Kwame Asare",date:"2023-10-05",readTime:"4 min read"}];let s="all";function i(){let a=[];const t=localStorage.getItem("visha_blog_posts");t&&JSON.parse(t).length>0?a=JSON.parse(t):(a=o,t||localStorage.setItem("visha_blog_posts",JSON.stringify(o)));let e=a;s!=="all"&&(e=a.filter(n=>n.category===s)),e.sort((n,l)=>new Date(l.date)-new Date(n.date)),d(e)}function d(a){const t=document.getElementById("posts-grid");if(a.length===0){t.innerHTML=`
        <div class="col-span-full text-center py-12">
          <p class="text-ink-muted dark:text-ink-muted-dark">No posts found in this category. Check back soon!</p>
        </div>
      `;return}t.innerHTML=a.map(e=>`
      <article class="card-brutalist flex flex-col overflow-hidden">
        <div class="relative aspect-square overflow-hidden border-b-2 border-charcoal dark:border-warm-dusk">
          <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-[1.04]"
            style='background-image: url("${e.bannerImage||"https://via.placeholder.com/400x400?text=No+Image"}")'></div>
          <span class="absolute top-3 left-3 bg-garnet text-white border-2 border-mahogany px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.07em]">${r(e.category||"Uncategorized")}</span>
        </div>
        <div class="p-5 flex-1 flex flex-col gap-2.5">
          <h3 class="font-display text-[1.0625rem] font-bold text-charcoal dark:text-alabaster leading-[1.25]">
            <a href="/blog/${e.slug}" class="hover:text-garnet transition-colors">
              ${r(e.title)}
            </a>
          </h3>
          <p class="text-[0.8125rem] text-ink-muted dark:text-ink-muted-dark leading-[1.65] flex-1">${r(e.excerpt||e.content.substring(0,120)+"...")}</p>
          <footer class="flex items-center justify-between mt-auto pt-3 border-t border-charcoal/10 dark:border-alabaster/10">
            <div>
              <time class="text-xs text-ink-muted dark:text-ink-muted-dark" datetime="${e.date}">${c(e.date)}</time>
              ${e.readTime?`<span class="text-xs text-ink-muted ml-2">· ${e.readTime}</span>`:""}
            </div>
            <a href="/blog/${e.slug}" class="text-[0.8125rem] font-bold text-garnet inline-flex items-center gap-1 transition-[gap] duration-150 hover:gap-2">
              Read story 
              <span class="material-symbols-outlined" style="font-size:15px">north_east</span>
            </a>
          </footer>
        </div>
      </article>
    `).join("")}function c(a){return new Date(a).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function r(a){const t=document.createElement("div");return t.textContent=a,t.innerHTML}function u(a){a.preventDefault(),a.target.classList.add("hidden");const e=document.getElementById("newsletter-success");e.classList.remove("hidden"),e.style.display="flex"}function m(){const a=document.querySelectorAll(".category-btn");a.forEach(t=>{t.addEventListener("click",()=>{a.forEach(e=>{e.classList.remove("border-garnet","text-charcoal"),e.classList.add("border-transparent","text-ink-muted"),e.classList.contains("dark")&&e.classList.add("dark:text-ink-muted-dark")}),t.classList.remove("border-transparent","text-ink-muted"),t.classList.add("border-garnet","text-charcoal"),t.classList.contains("dark")&&t.classList.remove("dark:text-ink-muted-dark"),s=t.dataset.category,i()})})}window.addEventListener("DOMContentLoaded",()=>{i(),m()});window.handleNewsletter=u;
