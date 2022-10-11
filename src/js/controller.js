import data from './data.json';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { stringify } from 'querystring';

const container = document.querySelector('.container');
const comments = data.comments;

let lastId = 4;

const generateMarkup = function () {
  const markup = `
${comments
  .map(comments => {
    return `
      <div class="container__comments" data-id=${comments.id}>
        ${
          comments.user.username === data.currentUser.username
            ? `
        <div class="comments comments__${comments.id} comments__user replies__current-user" data-id="${comments.id}">
          <div class="user">
            <div class="user__img">
              <img
                src="${data.currentUser.image.png}"
                alt="picture"
                class="user-photo"
              />
            </div>
            <p class="user__username">${data.currentUser.username}</p>
            <div class="user-tag">
              <p class="you">you</p>
            </div>
            <p class="created-at">${comments.createdAt}</p>
          </div>
          <div class="content-box">
            <p class="content">
              ${comments.content}
            </p>
          </div>
          <div class="display__footer">
            <div class="score-box">
              <div class="score-box__icon plus">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </div>
              <p class="score">${comments.score}</p>
              <div class="score-box__icon minus">
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </div>
            </div>
            <div class="user__tool-box current-user__tool--box display__footer">
              <div class="delete-box delete-box__comments display__footer" data-id="${comments.id}">
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                    fill="#ED6368"
                  />
                </svg>
                <p class="delete font">Delete</p>
              </div>

              <div class="edit-box display__footer" data-id="${comments.id}">
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="#5357B6"
                  />
                </svg>
                <p class="edit font">Edit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal modal__${comments.id} hidden">
        <div class="alert alert__comments">
          <div class="content-box">
            <h1 class="delete-comment">Delete comment</h1>
            <p class="content">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
          </div>
          <div class="buttons display__footer">
            <button class="button button-cancel button-cancel__${comments.id}" data-id="${comments.id}">NO, CANCEL</button>
            <button class="button button-delete button-delete__comments button-delete__${comments.id}" data-id="${comments.id}">YES, DELETE</button>
          </div>
        </div>
      </div>
      <div class="overlay overlay__${comments.id} hidden"></div>
          `
            : `
        <div class="comments comments-top" data-id="${comments.id}">
          <div class="user">
            <div class="user__img">
              <img
              src="${comments.user.image.png}"
              alt="picture"
              class="user-photo"
              />
            </div>
            <p class="user__username">${comments.user.username}</p>
            <p class="created-at">${comments.createdAt}</p>
          </div>
          <div class="content-box">
            <p class="content">
              ${comments.content}
            </p>
          </div>
          <div class="display__footer">
            <div class="score-box">
              <div class="score-box__icon plus">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                  <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                  fill="#C5C6EF"
                  />
                </svg>
              </div>
              <p class="score">${comments.score}</p>
              <div class="score-box__icon minus">
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                  <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                  fill="#C5C6EF"
                  />
                </svg>
              </div>
            </div>
            <div class="reply-box" data-id="${comments.id}">
              <div class="reply-icon">
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                  <path
                  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                  fill="#5357B6"
                  />
                </svg>
              </div>
              <p class="reply">Reply</p>
            </div>
          </div>
        </div>

        <div class="comments add-reply add-reply--${comments.id} hidden">
          <form>
            <textarea
              id="user-replies__${comments.id}"
              type="text"
              rows="3"
              columns="50"
              wrap="hard"
              class="add-reply__input add-reply__input--${comments.id}"
              data-id="${comments.id}" 
              value="@${comments.user.username}"
              name="user-replies__${comments.id}"
              placeholder="Reply to ${comments.user.username}"
            ></textarea>
          </form>
          <div class="display__footer">
            <div class="user__img">
              <img
              src="${data.currentUser.image.png}"
              alt="picture"
              class="user-photo"
              />
            </div>
            <button class="button send-button send-button__reply" data-id="${comments.id}">reply</button>
          </div>
        </div>
      </div>

      <div class="modal modal__${comments.id} hidden">
        <div class="alert alert__comments">
          <div class="content-box">
            <h1 class="delete-comment">Delete comment</h1>
            <p class="content">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
          </div>
          <div class="buttons display__footer">
            <button class="button button-cancel button-cancel" data-id="${comments.id}">NO, CANCEL</button>
            <button class="button button-delete button-delete__comments button-delete__${comments.id}" data-id="${comments.id}">YES, DELETE</button>
          </div>
        </div>
      </div>
      <div class="overlay overlay__${comments.id} hidden" data-id="${comments.id}"></div>
        `
        }

      <div class="container__replies">
                ${comments.replies
                  .map(rep => {
                    if (rep.length === 0) return;
                    return `
        <div class="comments replies replies__${rep.id} ${
                      rep.user.username === data.currentUser.username
                        ? `replies__current-user`
                        : ''
                    }" data-id="${rep.id}">
          <div class="user">
            <div class="user__img">
              <img
                src="${rep.user.image.png}"
                alt="picture"
                class="user-photo"
              />
            </div>
            <p class="user__username">${rep.user.username}</p>
              ${
                rep.user.username === data.currentUser.username
                  ? `
            <div class="user-tag">
              <p class="you">you</p>
            </div>
              `
                  : ''
              }
            <p class="created-at">${rep.createdAt}</p>
          </div>
          <div class="content-box">
            <p class="content">
              <span>@${rep.replyingTo}</span> ${rep.content}
            </p>
          </div>
          <div class="display__footer">
            <div class="score-box">
              <div class="score-box__icon plus">
                <svg
                  width="11"
                  height="11"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </div>
              <p class="score">${rep.score}</p>
              <div class="score-box__icon minus">
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </div>
            </div>
            <div class="display__footer ${
              rep.user.username === data.currentUser.username
                ? `current-user__tool--box`
                : ''
            }">

              ${
                rep.user.username === data.currentUser.username
                  ? `
              <div class="delete-box delete-box__comments display__footer" data-id="${rep.id}">
                <svg
                  width="12"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                    d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                    fill="#ED6368"
                  />
                </svg>
                <p class="delete font">Delete</p>
              </div>

              <div class="edit-box display__footer" data-id="${rep.id}">
                <svg
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="#5357B6"
                  />
                </svg>
                <p class="edit font">Edit</p>
              </div>

              <div class="modal modal__${rep.id} hidden">
                <div class="alert alert__comments">
                  <div class="content-box">
                    <h1 class="delete-comment">Delete comment</h1>
                    <p class="content">
                      Are you sure you want to delete this comment? This will remove the
                      comment and can't be undone.
                    </p>
                  </div>
                  <div class="buttons display__footer">
                    <button class="button button-cancel" data-id="${rep.id}">NO, CANCEL</button>
                    <button class="button button-delete button-delete__reply button-delete__${rep.id}" data-id="${rep.id}">YES, DELETE</button>
                  </div>
                </div>
              </div>
              <div class="overlay overlay__${rep.id} hidden"></div>
              `
                  : `
              <div class="reply-box reply-box__replies" data-id="${rep.id}">
                <div class="reply-icon">
                  <svg
                    width="14"
                    height="13"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                      d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                      fill="#5357B6"
                    />
                  </svg>
                </div>
                <p class="reply">Reply</p>
              </div>
                  `
              }
              </div>
            </div>
          </div>

          ${
            rep.user.username !== data.currentUser.username
              ? `
          <div class="replies add-reply add-reply--${rep.id} hidden">
            <form>
              <textarea
                id="user-replies__${rep.id}"
                type="text"
                rows="3"
                columns="50"
                wrap="hard"
                class="add-reply__input add-reply__input--${rep.id}"
                data-id="${rep.id}" 
                value="@${rep.user.username}"
                name="user-replies__${rep.id}"
                placeholder="Reply to ${rep.user.username}"
              ></textarea>
            </form>
            <div class="display__footer">
              <div class="user__img">
                <img
                  src="${data.currentUser.image.png}"
                  alt="picture"
                  class="user-photo"
                />
              </div>
              <button class="button send-button send-button__reply--2" data-id="${rep.id}">reply</button>
            </div>
          </div>
              `
              : `
                 `
          }

                `;
                  })
                  .join('')}
            </div>
            `;
  })
  .join('')}

      <div class="comments add-comment">
        <form>
          <textarea
            id="user-comments"
            type="text"
            rows="3"
            columns="50"
            wrap="hard"
            class="add-comment__input"
            placeholder="Add a commment..."
            name="user-comments"
          ></textarea>
      <label id="user-comments"></label>
        </form>
        <div class="display__footer">
          <div class="user__img">
            <img
              src="${data.currentUser.image.png}"
              alt="picture"
              class="user-photo"
            />
          </div>
          <button class="button send-button send-button__comment">Send</button>
        </div>
      </div>
   `;
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', markup);
};
generateMarkup(comments);

container.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.reply-box' || '.reply-box__replies');
  //   guard clause
  if (!clicked) return;
  //   Activate content area
  container
    .querySelector(`.add-reply--${clicked.dataset.id}`)
    .classList.toggle('hidden');
});

const pushToData = function (data) {
  const commentInput = container.querySelector('.add-comment__input');
  if (!commentInput.value) return;
  console.log(commentInput.value);
  data.comments.push({
    id: (lastId += 1),
    content: commentInput.value[0].toUpperCase() + commentInput.value.slice(1),
    createdAt: formatDate(new Date()),
    score: 0,
    user: {
      image: {
        png: data.currentUser.image.png,
        webp: data.currentUser.image.webp,
      },
      username: data.currentUser.username,
    },
    replies: [],
  });
};

container.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.send-button__comment');
  if (!clicked) return;
  pushToData(data);
  generateMarkup(comments);
  console.log(comments);
});

const pushToReplies = function (comments) {
  const replyInput = container.querySelector(
    `.add-reply__input--${comments.id}`
  );
  if (!replyInput) return;
  if (!replyInput.value) return;
  comments.replies.push({
    id: (lastId += 1),
    content: replyInput.value[0].toUpperCase() + replyInput.value.slice(1),
    createdAt: formatDate(new Date()),
    score: 0,
    replyingTo: comments.user.username,
    user: {
      image: {
        png: data.currentUser.image.png,
        webp: data.currentUser.image.webp,
      },
      username: data.currentUser.username,
    },
  });
};

container.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest(`.send-button__reply`);
  if (!clicked) return;
  const index = comments
    .map(com => com.id)
    .findIndex(id => id === +clicked.dataset.id);
  pushToReplies(comments[index]);
  generateMarkup(comments);
  console.log(comments[index]);
});

container.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest(`.send-button__reply--2`);
  if (!clicked) return;
  const index = comments[1].replies
    .map(rep => rep.id)
    .findIndex(id => id === +clicked.dataset.id);

  const replyInput = container.querySelector(
    `.add-reply__input--${comments[1].replies[index].id}`
  );
  if (!replyInput) return;
  comments[1].replies.push({
    id: (lastId += 1),
    content: replyInput.value[0].toUpperCase() + replyInput.value.slice(1),
    createdAt: formatDate(new Date()),
    score: 0,
    replyingTo: comments[1].replies[index].user.username,
    user: {
      image: {
        png: data.currentUser.image.png,
        webp: data.currentUser.image.webp,
      },
      username: data.currentUser.username,
    },
  });
  generateMarkup(comments);
  console.log(comments[1].replies);
});

const formatDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed < 7) return `${daysPassed} days ago`;
  if (daysPassed >= 7) return `${daysPassed / 7} weeks ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

container.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.delete-box__comments');
  //   guard clause
  if (!clicked) return;
  //   Activate content area
  container
    .querySelector(`.modal__${clicked.dataset.id}`)
    .classList.remove('hidden');
  container
    .querySelector(`.overlay__${clicked.dataset.id}`)
    .classList.remove('hidden');
});

const deleteComments = function () {
  container.addEventListener('click', function (e) {
    const clicked = e.target.closest(`.button-cancel`);
    if (!clicked) return;
    // console.log(userComments);
    container
      .querySelector(`.modal__${clicked.dataset.id}`)
      .classList.add('hidden');
    container
      .querySelector(`.overlay__${clicked.dataset.id}`)
      .classList.add('hidden');
  });

  container.addEventListener('click', function (e) {
    const clicked = e.target.closest(`.button-delete__comments`);
    if (!clicked) return;
    container
      .querySelector(`.modal__${clicked.dataset.id}`)
      .classList.add('hidden');
    container
      .querySelector(`.overlay__${clicked.dataset.id}`)
      .classList.add('hidden');

    const index = comments
      .map(com => com.id)
      .findIndex(id => id === +clicked.dataset.id);

    comments.splice(index, 1);
    generateMarkup(comments);
    console.log(comments, comments.length);
  });

  container.addEventListener('click', function (e) {
    const clicked = e.target.closest('.button-delete__reply');
    if (!clicked) return;

    container
      .querySelector(`.modal__${clicked.dataset.id}`)
      .classList.add('hidden');
    container
      .querySelector(`.overlay__${clicked.dataset.id}`)
      .classList.add('hidden');

    const clickedTop = clicked.closest(
      '.container__replies'
    ).previousElementSibling;
    if (!clickedTop) return;
    console.log(clickedTop);

    const index = comments
      .map(com => com.id)
      .findIndex(id => id === +clickedTop.dataset.id);
    console.log(index);

    console.log(comments[index].replies);
    const repIndex = comments[index].replies
      .map(rep => rep.id)
      .findIndex(id => id === +clicked.dataset.id);
    console.log(repIndex);

    comments[index].replies.splice(repIndex, 1);
    generateMarkup(comments);
    console.log(comments[index].replies);
  });
};
deleteComments();

container.addEventListener('click', function (e) {
  const clicked = e.target.closest('.edit-box');
  if (!clicked) return;
  console.log(clicked);
});
