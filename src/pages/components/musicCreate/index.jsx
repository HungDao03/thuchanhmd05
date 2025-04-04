import React from "react";
import { Card, CardContent, CardHeader, Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import MusicService from "../../../services/music.service.js";

function MusicCreate() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            singer: "",
            composer: "",
            duration: "",
            likes: 0,
            status: "Lưu Trữ"
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Tên bài hát là bắt buộc").min(2, "Tên bài hát phải có ít nhất 2 ký tự"),
            singer: Yup.string().required("Tên ca sĩ là bắt buộc").max(30, "Tên ca sĩ không được vượt quá 30 ký tự"),
            composer: Yup.string().required("Tên nhạc sĩ là bắt buộc").max(30, "Tên nhạc sĩ không được vượt quá 30 ký tự"),
            duration: Yup.string()
                .required("Thời gian phát là bắt buộc")
                .matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, "Thời gian phát phải theo định dạng hh:mm"),
            likes: Yup.number().required("Số lượt thích là bắt buộc").integer("Số lượt thích phải là một số nguyên").min(0, "Số lượt thích phải là 0 hoặc số dương"),
        }),

        onSubmit: values => {
            const musicData = { ...values};

            MusicService.createMusic(musicData).then(() => {
                toast.success("Tạo bài hát thành công");
                console.log(musicData);
                navigate("/musics");
            }).catch(() => {
                toast.error("Tạo bài hát thất bại");
            });

        }
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ width: 500, p: 3 }}>
                <CardHeader title="Create Music" sx={{ textAlign: "center" }} />
                <CardContent>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {/* Tên bài hát */}
                        <TextField
                            label="Tên bài hát"
                            name="title"
                            fullWidth
                            required
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />

                        {/* Tên ca sĩ */}
                        <TextField
                            label="Tên ca sĩ"
                            name="singer"
                            fullWidth
                            required
                            value={formik.values.singer}
                            onChange={formik.handleChange}
                            error={formik.touched.singer && Boolean(formik.errors.singer)}
                            helperText={formik.touched.singer && formik.errors.singer}
                        />

                        {/* Tên nhạc sĩ */}
                        <TextField
                            label="Tên nhạc sĩ"
                            name="composer"
                            fullWidth
                            required
                            value={formik.values.composer}
                            onChange={formik.handleChange}
                            error={formik.touched.composer && Boolean(formik.errors.composer)}
                            helperText={formik.touched.composer && formik.errors.composer}
                        />

                        {/* Thời gian phát */}
                        <TextField
                            label="Thời gian (hh:mm)"
                            name="duration"
                            fullWidth
                            required
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                            helperText={formik.touched.duration && formik.errors.duration}
                        />

                        {/* Button submit */}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create Music
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default MusicCreate;
