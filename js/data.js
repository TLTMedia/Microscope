function getData() {
    console.log("aa")
    var promise = jQuery.Deferred();
//    var id = "1U8M_9FT1TqBzReDWMA0N7S3CR3J9DOPN4IGm5ci5xJc";
    var id = "11pRZUkvisdi-x7HCuwoJFwmInKvrNuvUDcQKAOFoErM";
    var gid = "0";




    $.get(`//apps.tlt.stonybrook.edu/gproxy/?id=${id}&gid=${gid}`, function (data) {
        var gdata = $.csv.toObjects(data);
        promise.resolve(gdata)

    });

    return promise.promise()
}
