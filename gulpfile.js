const gulp = require('gulp');
const sftp = require('gulp-sftp');
// export PATH=./node_modules/.bin:$PATH
/*u: partner
p: 27ZavaTvzv
host: strikepro.ru*/

gulp.task('default', function () {
    return gulp.src('build/**')
        .pipe(sftp({
            host: 'strikepro.ru',
            user: 'partner',
            pass: '27ZavaTvzv',
            remotePath: '/home/partner/web/partner.strikepro.ru/public_html'
        }));
});