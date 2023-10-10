async function get(endpoint, args) {
  const {postfix, options} = args ? args : {
    postfix: '',
    options: {},
  };

  // Format the endpoint into a suitable url
  endpoint = `https://www.reddit.com${endpoint}.json`;

  if (postfix) { endpoint += postfix; }

  // Make and await the request
  const response = await fetch(endpoint, options);

  // Return the body of the response as an Object
  return await response.json();
}

function formatTimeData(timestamp) {
  // Shorthand used for ease of reading later
  const second = 1000;
  const minute = second * 60;
  const hour   = minute * 60;
  const day    = hour   * 24;
  const week   = day    * 7;
  const month  = day    * 30;
  const year   = day    * 365;

  // If the time is less than 1 minute, return the time in seconds
  if (timestamp <= minute) {
    return `${Math.floor(timestamp / second)} seconds ago`;
  }
  // If the time is less than 1 hour, return the time in minutes
  else if (timestamp <= hour) {
    return `${Math.floor(timestamp / minute)} minutes ago`;
  }
  // If the time is less than 1 day, return the time in hours
  else if (timestamp <= day) {
    return `${Math.floor(timestamp / hour)} hours ago`;
  }
  // If the time is less than 1 week, return the time in days
  else if (timestamp <= week) {
    return `${Math.floor(timestamp / day)} days ago`;
  }
  // If the time is less than 1 month, return the time in weeks
  else if (timestamp <= month) {
    return `${Math.floor(timestamp / week)} weeks ago`;
  }
  // If the time is less than 1 year, return the time in months
  else if (timestamp <= year) {
    return `${Math.floor(timestamp / month)} months ago`;
  }
  // Otherwise, return the time in years
  else {
    return `${Math.floor(timestamp / year)} years ago`;
  }
}

function formatNumberData(number) {
  // If the number is less than 1,000, don't reformat it
  if (number < 1000) {
    return `${number}`;
  }
  // If the number is less than 1,000,000, format like this: 100.0k
  else if (number < 1000000) {
    return `${Math.floor(number / 100) / 10}k`;
  }
  // If the number is less than 1,000,000,000, format like this: 100.0m
  else if (number < 1000000000) {
    return `${Math.floor(number / 100000) / 10}m`
  }
  // If the number is less than 1,000,000,000,000, format like this: 100.0b
  else if (number < 1000000000000) {
    return `${Math.floor(number / 100000000) / 10}b`
  }
  // If the number is less than 1,000,000,000,000,000, format like this: 100.0t
  else if (number < 1000000000000000) {
    return `${Math.floor(number / 100000000000) / 10}t`
  }
}

function formatPageData(page) {
  const children = page.data.children;

  return children.map(({data}) => {

    // Filter out all 18+ pages
    if (data.over_18) { return undefined; }

    // Format the body of the post
    let body = data?.selftext;
    body = body && `<p>${body}</p>`;
    
    return {
      title: data.title,
      body,
      author: 'by '+data.author,
      timeAgo: formatTimeData(data.created_utc),
      subreddit: data.subreddit,
      upvotes: 'Upvotes: '+formatNumberData(data.ups),
      permalink: data.permalink,
      commentCount: 'Comments: '+formatNumberData(data.num_comments),
      // media: [...formatPreviewData(data), ...formatMediaData(data)],
      media: /https:\/\/i\.redd\.it\/.+\..+/.test(data.url) ? data.url : undefined,
    };
  });
}

async function getPage(url) {
  // Request the page using the input url
  let page = await get(url);

  // If the request limit has been reached, return the error
  if (page.error === 429) { return page; }

  // If the page doesn't exist, return the error
  if (page.error === 404) { return page; }

  // Format and return the page data
  page = formatPageData(page);
  return page;
}

function formatCommentData(comments) {
  return comments?.data?.children?.map((reply) => {
    reply = reply.data;

    // Recursively format replies
    let replies = formatCommentData(reply.replies);

    // Format the body of the comment
    let body = reply?.body;
    body = body && `<p>${body}</p>`;

    return {
      author: reply.author,
      body,
      timeAgo: formatTimeData(reply.created_utc),
      upvotes: formatNumberData(reply.ups),
      permalink: reply.permalink,
      pinned: reply.stickied,
      replies,
      replyCount: replies?.length,
    };
  });
}

async function getComments(url) {
  // Request the comments using the input url
  let comments = (await get(url))[1];
  // Format and return the comments
  return formatCommentData(comments);
}

function formatSubData(sub) {
  const pattern = /^(https:\/\/styles.redditmedia.com\/[A-Za-z0-9\.\/_]+)?/;
  const icon = pattern.exec(sub.community_icon)[0];
  return {
    name: sub.display_name,
    url: sub.url,
    icon,
  };
}

async function getSubreddits() {
  const r = await get('/reddits');
  const subs = r?.data?.children;

  if (!subs) {
    return [];
  }
  if (!subs?.length) {
    return [];
  }
  return subs.map(sub=>formatSubData(sub.data)).slice(0, 5);
}

async function getSubreddit(query) {
  query = encodeURI(query);
  const r = await get('/subreddits/search', {postfix: `?q=${query}`});
  const subs = r?.data?.children;

  if (!subs) {
    return [];
  }
  if (!subs?.length) {
    return [];
  }
  return formatSubData(subs[0]?.data);
}

const GET = {
  page: getPage,
  comments: getComments,
  subreddits: getSubreddits,
  subreddit: getSubreddit,
}; export default GET;
