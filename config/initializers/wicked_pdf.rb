# WickedPDF Global Configuration
#
# Use this to set up shared configuration options for your entire application.
# Any of the configuration options shown here can also be applied to single
# models by passing arguments to the `render :pdf` call.
#
# To learn more, check out the README:
#
# https://github.com/mileszs/wicked_pdf/blob/master/README.md

def wkhtmltopdf_path
  if Rails.env.staging? || Rails.env.production?
    Rails.root.join('bin', 'wkhtmltopdf-amd64').to_s
  else
    '/usr/local/rvm/gems/ruby-2.1.3/bin/wkhtmltopdf'
  end
end

WickedPdf.config = {
  # Path to the wkhtmltopdf executable: This usually isn't needed if using
  # one of the wkhtmltopdf-binary family of gems.
  exe_path: wkhtmltopdf_path
  #   or
  # exe_path: Gem.bin_path('wkhtmltopdf-binary', 'wkhtmltopdf')

  # Layout file to be used for all PDFs
  # (but can be overridden in `render :pdf` calls)
  # layout: 'pdf.html',
}

def wicked_pdf_stylesheet_link_tag(*sources)
  sources.collect { |source|
    "<style type='text/css'>#{Rails.application.assets.find_asset("#{source}.css")}</style>"
  }.join("\n").gsub(/url\(['"](.+)['"]\)(.+)/,%[url("#{wicked_pdf_image_location("\\1")}")\\2]).html_safe
end

def wicked_pdf_image_tag(img, options={})
  image_tag wicked_pdf_image_location(img), options
end

def wicked_pdf_image_location(img)
  "file://#{Rails.root.join('app', 'assets', 'images', img)}"
end

def wicked_pdf_javascript_src_tag(source)
  "<script type='text/javascript'>#{Rails.application.assets.find_asset("#{source}.js").body}</script>"
end

def wicked_pdf_javascript_include_tag(*sources)
  sources.collect{ |source| wicked_pdf_javascript_src_tag(source) }.join("\n").html_safe
end
