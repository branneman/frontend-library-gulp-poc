import { upload as config } from '../config';
import gulp from 'gulp';
import { log } from 'gulp-util';
import ftp from 'vinyl-ftp';

/**
 * Task: Upload via FTP
 */
gulp.task('file-upload', () => {
    config.options.log = log;

    return gulp.src([config.src.all], { base: config.dist.base, buffer: false })
        .pipe(ftp.create(config.options).dest(config.dist.target));
});
